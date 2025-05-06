import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useUserStore } from "../store/user";
import { useGenAi } from "./useGenAi";
import { useToast } from "../store/toast";
import { watch } from "vue";
import { useAiMessagesStore } from "../store/aiMessages";
import { storeToRefs } from "pinia";

export default function useAiChat() {
  const { messages, isLoading } = storeToRefs(useAiMessagesStore());
  const { user } = useUserStore();
  const { addToast } = useToast();

  // Fetching messages from Firestore
  const fetchMessages = async (userId) => {
    try {
      const userChatRef = collection(db, "users", userId, "aiChats");
      const q = query(userChatRef, orderBy("createdAt"));
      const snapshot = await getDocs(q);

      messages.value = snapshot.docs.map((doc) => ({
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.(),
      }));
    } catch (error) {
      addToast("Error fetching messages", "error");
    }
  };

  watch(
    () => user?.uid,
    async (uid) => {
      if (uid) {
        await fetchMessages(uid);
      }
    },
    { immediate: true }
  );

  // Save message to Firestore
  const saveMessageToFirestore = async (content, isUser) => {
    if (!user?.uid || !content.trim()) return; // Ensure content is not empty
    const userChatRef = collection(db, "users", user.uid, "aiChats");
    try {
      await addDoc(userChatRef, {
        content,
        isUser,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      addToast("Error saving message", "error");
    }
  };

  // Clear all chats
  const clearChats = async () => {
    messages.value = [];
    try {
      const aiChatRef = collection(db, `users/${user.uid}/aiChats`);
      const querySnapshot = await getDocs(query(aiChatRef));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      addToast("Error clearing chats", "error");
    }
  };

  // Fetch answer from generative model
  const fetchAnswer = async (question) => {
    if (!question) return;
    isLoading.value = true;

    const userQuestion = {
      content: question,
      isUser: true,
      createdAt: new Date(),
    };
    messages.value.push(userQuestion);
    await saveMessageToFirestore(userQuestion.content, true);

    try {
      const aiReply = await useGenAi(question);
      const response = {
        content: aiReply,
        isUser: false,
        createdAt: new Date(),
      };
      messages.value.push(response);
      await saveMessageToFirestore(response.content, false);
    } catch (error) {
      const errMsg = {
        content: "⚠️ Sorry, something went wrong.",
        isUser: false,
        createdAt: new Date(),
      };
      messages.value.push(errMsg);
      await saveMessageToFirestore(errMsg.content, false);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    messages,
    fetchAnswer,
    isLoading,
    clearChats,
  };
}
