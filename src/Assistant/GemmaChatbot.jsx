import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  FaPaperPlane,
  FaTrash,
  FaQuestionCircle,
  FaDatabase,
  FaDownload,
  FaUpload,
  FaEdit,
  FaSave,
  FaTimes,
  FaRobot,
  FaUser,
  FaTimesCircle,
} from "react-icons/fa";

const GemmaChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 হ্যালো! আমি Books Vibes-এর AI সহায়ক!\n\nআমাকে যেকোনো কিছু জিজ্ঞেস করতে পারো:\n• 💬 **সাধারণ কথাবার্তা** — কেমন আছো, তোমার নাম কি\n• 📚 **বই সম্পর্কে** — সেরা বই, Fantasy বই\n• 🌐 **এই ওয়েবসাইট সম্পর্কে** — কী আছে এখানে\n\nশুরু করো! 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [showKnowledgePanel, setShowKnowledgePanel] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ question: "", answer: "" });
  const [waitingForAnswer, setWaitingForAnswer] = useState(null);
  const [showSkipOption, setShowSkipOption] = useState(false);
  const messagesEndRef = useRef(null);

  // নলেজ বেস লোড করা (সঠিকভাবে)
  useEffect(() => {
    // Books Data লোড
    fetch("/booksData.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => console.error("Books data লোড হয়নি"));

    // নলেজ বেস লোড করার ফাংশন
    const loadKnowledgeBase = async () => {
      try {
        // প্রথমে LocalStorage চেক করুন
        const savedKnowledge = localStorage.getItem("chatbot_knowledge_base");

        if (savedKnowledge && JSON.parse(savedKnowledge).length > 0) {
          setKnowledgeBase(JSON.parse(savedKnowledge));
          console.log(
            "✅ LocalStorage থেকে লোড হয়েছে:",
            JSON.parse(savedKnowledge).length,
            "টি প্রশ্ন",
          );
          return;
        }

        // LocalStorage খালি থাকলে JSON ফাইল থেকে লোড করুন
        const response = await fetch("/knolageData.json");
        if (response.ok) {
          const data = await response.json();
          if (data.knowledgeBase && data.knowledgeBase.length > 0) {
            setKnowledgeBase(data.knowledgeBase);
            localStorage.setItem(
              "chatbot_knowledge_base",
              JSON.stringify(data.knowledgeBase),
            );
            console.log(
              `✅ knolageData.json থেকে ${data.knowledgeBase.length}টি প্রশ্ন-উত্তর লোড করা হয়েছে!`,
            );
            console.log(
              "প্রথম ৫টি প্রশ্ন:",
              data.knowledgeBase.slice(0, 5).map((k) => k.question),
            );
            return;
          }
        } else {
          console.error("knolageData.json ফাইল পাওয়া যায়নি!");
        }
      } catch (error) {
        console.error("knowledgeBase.json লোড করতে ব্যর্থ:", error);
      }

      // কোন ডাটা না থাকলে ডিফল্ট ডাটা ব্যবহার করুন
      const defaultKnowledge = [
        {
          id: 1,
          question: "books vibes কি",
          answer:
            "Books Vibes হলো একটি বই প্রেমীদের ওয়েবসাইট যেখানে আপনি বই দেখতে, রেটিং দিতে, পড়ার তালিকা তৈরি করতে পারেন!",
          taughtBy: "system",
          timestamp: new Date().toLocaleString(),
          status: "approved",
        },
        {
          id: 2,
          question: "কিভাবে অ্যাকাউন্ট খুলবো",
          answer:
            "উপরে Sign Up বাটনে ক্লিক করে আপনার তথ্য দিন। তারপর Sign In করুন।",
          taughtBy: "system",
          timestamp: new Date().toLocaleString(),
          status: "approved",
        },
      ];
      setKnowledgeBase(defaultKnowledge);
      localStorage.setItem(
        "chatbot_knowledge_base",
        JSON.stringify(defaultKnowledge),
      );
      console.log("✅ ডিফল্ট নলেজ বেস লোড করা হয়েছে!");
    };

    loadKnowledgeBase();
  }, []);

  // নলেজ বেস সংরক্ষণ
  useEffect(() => {
    if (knowledgeBase.length > 0) {
      localStorage.setItem(
        "chatbot_knowledge_base",
        JSON.stringify(knowledgeBase),
      );
    }
  }, [knowledgeBase]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const bookDetail = (book) => {
    return `📖 **${book.bookName}**\n\n✍️ লেখক: ${book.author}\n⭐ রেটিং: ${book.rating}/5\n📄 পৃষ্ঠা: ${book.totalPages}\n🏷️ ক্যাটাগরি: ${book.category}\n🔖 ট্যাগ: ${book.tags?.join(", ")}\n🏢 প্রকাশক: ${book.publisher}\n📅 প্রকাশ সাল: ${book.yearOfPublishing}\n\n💬 রিভিউ: ${book.review?.substring(0, 250)}...`;
  };

  // নলেজ বেস থেকে উত্তর খোঁজা (সুপার ইম্প্রুভড)
  const findAnswerInKnowledgeBase = (question) => {
    if (!knowledgeBase.length) {
      console.log("নলেজ বেস খালি!");
      return null;
    }

    const lowerQuestion = question.toLowerCase().trim();
    console.log("খোঁজা হচ্ছে:", lowerQuestion);
    console.log("নলেজ বেসে মোট:", knowledgeBase.length, "টি প্রশ্ন");

    // 1. Exact match
    let found = knowledgeBase.find(
      (kb) =>
        kb.question.toLowerCase() === lowerQuestion && kb.status === "approved",
    );
    if (found) {
      console.log("Exact match পাওয়া গেছে:", found.question);
      return found.answer;
    }

    // 2. প্রশ্নের মধ্যে সম্পূর্ণ ম্যাচ (includes)
    found = knowledgeBase.find(
      (kb) =>
        lowerQuestion.includes(kb.question.toLowerCase()) &&
        kb.status === "approved",
    );
    if (found) {
      console.log("Includes match পাওয়া গেছে:", found.question);
      return found.answer;
    }

    // 3. নলেজ বেসের প্রশ্ন ব্যবহারকারীর প্রশ্নের মধ্যে আছে কিনা
    found = knowledgeBase.find(
      (kb) =>
        kb.question.toLowerCase().includes(lowerQuestion) &&
        kb.status === "approved",
    );
    if (found) {
      console.log("Reverse includes match পাওয়া গেছে:", found.question);
      return found.answer;
    }

    // 4. Keyword based search - শব্দ ভাঙিয়ে খোঁজা
    const keywords = lowerQuestion.split(/\s+/).filter((w) => w.length > 2);
    for (const kb of knowledgeBase) {
      if (kb.status !== "approved") continue;
      const kbQuestion = kb.question.toLowerCase();
      let matchCount = 0;
      for (const keyword of keywords) {
        if (kbQuestion.includes(keyword)) {
          matchCount++;
        }
      }
      if (matchCount >= keywords.length / 2) {
        console.log("Keyword match পাওয়া গেছে:", kb.question);
        return kb.answer;
      }
    }

    console.log("কোন ম্যাচ পাওয়া যায়নি!");
    return null;
  };

  const saveToKnowledgeBase = (question, answer, taughtBy = "user") => {
    const existingIndex = knowledgeBase.findIndex(
      (kb) => kb.question.toLowerCase() === question.toLowerCase(),
    );

    if (existingIndex !== -1) {
      setKnowledgeBase((prev) => {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          answer: answer,
          taughtBy: taughtBy,
          timestamp: new Date().toLocaleString(),
          status: "approved",
        };
        return updated;
      });
    } else {
      const newEntry = {
        id: Date.now(),
        question: question,
        answer: answer,
        taughtBy: taughtBy,
        timestamp: new Date().toLocaleString(),
        status: "approved",
      };
      setKnowledgeBase((prev) => [newEntry, ...prev]);
    }
  };

  // ইউজারকে প্রশ্ন করার ফাংশন (স্কিপ অপশন সহ)
  const askUserForAnswer = (question) => {
    setWaitingForAnswer(question);
    setShowSkipOption(true);
    return `🤔 **"${question}"** — এই প্রশ্নের উত্তর আমি এখন জানি না।\n\n📝 আপনি কি আমাকে শিখিয়ে দিতে চান?\n\n➡️ **হ্যাঁ** - উত্তর লিখে পাঠান\n➡️ **না** - নিচের "বাদ দিন" বাটনে ক্লিক করুন\n\n(আপনি উত্তর দিলে আমি শিখে যাব, না দিলে কিছুই সংরক্ষণ করব না)`;
  };

  // ইউজারের দেওয়া উত্তর শেখা
  const learnFromUser = (question, userAnswer) => {
    saveToKnowledgeBase(question, userAnswer, "user");
    setShowSkipOption(false);
    return `🎉 **ধন্যবাদ!** আমি শিখে গেলাম!\n\n📚 আপনার শেখানো উত্তর: "${userAnswer}"\n\n✅ এখন থেকে কেউ "${question}" জিজ্ঞেস করলে আমি সঠিক উত্তর দিতে পারবো।`;
  };

  // স্কিপ/বাদ দেওয়ার ফাংশন
  const skipLearning = () => {
    if (waitingForAnswer) {
      const skippedQuestion = waitingForAnswer;
      setWaitingForAnswer(null);
      setShowSkipOption(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `👍 ঠিক আছে! "${skippedQuestion}" প্রশ্নটি আমি শিখলাম না। ভবিষ্যতে কেউ জানতে চাইলে আবার জিজ্ঞেস করব।\n\nআপনি অন্য কোনো প্রশ্ন করতে পারেন! 😊`,
        },
      ]);
    }
  };

  // বেসিক উত্তর (সম্পূর্ণ)
  const getBasicReply = (userInput, t) => {
    // ─────────────────────────────────────────
    //  ১. হ্যালো / সালাম / শুভেচ্ছা
    // ─────────────────────────────────────────
    if (/^(hi|hello|hey|helo|hellow|hola)$/.test(t))
      return "👋 Hi there! আমি Books Vibes AI। কীভাবে সাহায্য করতে পারি?";

    if (/(হ্যালো|হেলো|ওহে|আসসালামু|সালাম|slm|assalamu|walaikum)/.test(t))
      return "وعليكم السلام 👋 হ্যালো! Books Vibes-এ স্বাগতম। কী জানতে চাও?";

    if (/(subho|শুভ সকাল|good morning|shuvo sokal)/.test(t))
      return "🌅 শুভ সকাল! আজকে কোন বই পড়বে ঠিক করেছো?";

    if (/(good night|শুভ রাত্রি|shuvo ratri|good nite|goodnight)/.test(t))
      return "🌙 শুভ রাত্রি! ঘুমানোর আগে একটু বই পড়ো — ঘুম ভালো হয়! 😄";

    if (/(good evening|শুভ সন্ধ্যা|shuvo sondha)/.test(t))
      return "🌆 শুভ সন্ধ্যা! এই সময়ে একটু বই পড়া খুব মজার হয়।";

    if (/(good afternoon|দুপুর|শুভ দুপুর)/.test(t))
      return "☀️ শুভ দুপুর! কী খবর? কোনো বই নিয়ে জানতে চাও?";

    // ─────────────────────────────────────────
    //  ২. কেমন আছো
    // ─────────────────────────────────────────
    if (
      /(kemon acho|kemon aachen|kemon achen|কেমন আছ|কেমন আছেন|how are you|how r u|how ru|howru|hru)/.test(
        t,
      )
    )
      return "😊 আমি ভালো আছি, ধন্যবাদ! তুমি কেমন আছো? কোনো বই নিয়ে কথা বলতে চাও?";

    if (
      /(ami valo|ami bhalo|আমি ভালো|i am fine|im fine|i m fine|alhamdulillah|আলহামদুলিল্লাহ)/.test(
        t,
      )
    )
      return "😄 আলহামদুলিল্লাহ, ভালো আছো শুনে খুশি হলাম! চলো বই নিয়ে কথা বলি।";

    if (/(valo na|bhalo na|ভালো নেই|not good|not fine|kharap|খারাপ)/.test(t))
      return "😢 এটা শুনে মন খারাপ হলো। একটা ভালো বই পড়লে মন ভালো হয়ে যায়! চাইলে রিকমেন্ড করতে পারি।";

    // ─────────────────────────────────────────
    //  ৩. নাম
    // ─────────────────────────────────────────
    if (
      /(tomar name ki|tomar nam ki|তোমার নাম কি|তোমার নাম কী|what is your name|what's your name|whats your name|ur name|your name)/.test(
        t,
      )
    )
      return "🤖 আমার নাম **Books Vibes AI**! আমি Books Vibes ওয়েবসাইটের বই সহায়ক।";

    if (/(apnar name ki|apnar nam ki|আপনার নাম কি|আপনার নাম কী)/.test(t))
      return "🤖 আমার নাম **Books Vibes AI**। আমি এই সাইটের সব বইয়ের তথ্য জানি!";

    if (
      /(tomar porichoy|তোমার পরিচয়|introduce yourself|apni ke|tumi ke|তুমি কে|আপনি কে)/.test(
        t,
      )
    )
      return "🤖 আমি **Books Vibes AI** — একটি smart chatbot। আমি Books Vibes ওয়েবসাইটের জন্য তৈরি। বই খোঁজা, রিকমেন্ডেশন, রিভিউ — সবকিছুতে সাহায্য করি!";

    // ─────────────────────────────────────────
    //  ৪. কে বানিয়েছে / developer
    // ─────────────────────────────────────────
    if (
      /(ke baniece|ke baniyece|ke tairি করেছে|tomake ke baniyeche|tomake ke banie|কে বানিয়েছে|কে তৈরি করেছে|who made you|who created you|who built you|developer|dev|creator)/.test(
        t,
      )
    )
      return "👨‍💻 আমাকে তৈরি করেছেন **Books Vibes**-এর developer **Mohammad Riad Shekh** । এই প্রজেক্টটি React + Vite দিয়ে বানানো হয়েছে। আমি একটি learning chatbot — প্রশ্নের উত্তর ইউজারদের কাছ থেকে শিখি!";

    if (
      /(kon technology|kon tech|কোন technology|কোন ভাষায়|programming language|react|vite|javascript)/.test(
        t,
      )
    )
      return "💻 Books Vibes তৈরি হয়েছে:\n\n• **React.js** — UI framework\n• **Vite** — build tool\n• **Tailwind CSS** — styling\n• **React Router** — page navigation\n• **LocalStorage** — ডাটা সংরক্ষণের জন্য\n\nআমি (chatbot) ইউজারদের কাছ থেকে শিখে শিখে স্মার্ট হচ্ছি!";

    // ─────────────────────────────────────────
    //  ৫. ধন্যবাদ / বিদায়
    // ─────────────────────────────────────────
    if (
      /(dhonnobad|ধন্যবাদ|thank you|thanks|thnx|thx|shukriya|শুক্রিয়া|jazakallah|জাযাকাল্লাহ)/.test(
        t,
      )
    )
      return "😊 আপনাকে স্বাগতম! যেকোনো সময় প্রশ্ন করতে পারো। 📚";

    if (
      /(bye|বিদায়|আল্লাহ হাফেজ|allah hafez|khoda hafez|টাটা|tata|see you|cya|goodbye|good bye)/.test(
        t,
      )
    )
      return "👋 আল্লাহ হাফেজ! আবার এসো। ভালো থেকো এবং বই পড়তে থেকো! 📚";

    // ─────────────────────────────────────────
    //  ৬. ওয়েবসাইট / প্রজেক্ট সম্পর্কে
    // ─────────────────────────────────────────
    if (
      /(website ki|ei site ki|এই সাইট কী|books vibes ki|books vibes kি|about this site|about books vibes|site somporke|সাইট সম্পর্কে|project somporke|প্রজেক্ট সম্পর্কে)/.test(
        t,
      )
    )
      return "🌐 **Books Vibes** হলো একটি বই-প্রেমীদের ওয়েবসাইট!\n\n✨ **এখানে যা পাবে:**\n• 📚 বইয়ের সংগ্রহ দেখা\n• ⭐ বইয়ের রেটিং ও রিভিউ\n• 📖 Read List — পড়া বই সেভ করা\n• ❤️ Wishlist — পড়তে চাও এমন বই\n• 📄 Pages to Read — পৃষ্ঠা ট্র্যাকিং\n• 🤖 আমি (AI Chatbot)!\n\nSigned in করলে আরও সুবিধা পাবে!";

    if (
      /(ki ki feature|features ki|what features|ki ache ekhane|এখানে কী আছে|kি সুবিধা)/.test(
        t,
      )
    )
      return "✨ **Books Vibes-এর features:**\n\n1. 📚 **Home** — সব বইয়ের তালিকা\n2. 📋 **Listed Books** — তোমার Read ও Wishlist\n3. 📄 **Pages to Read** — কত পৃষ্ঠা পড়েছো ট্র্যাক করো\n4. 🔐 **Sign In / Sign Up** — account খোলো\n5. 🤖 **AI Chatbot** — আমি সবসময় আছি!\n6. 🔍 বই **filter** করা যায় category অনুযায়ী\n7. 🧠 **Self-Learning** — ইউজারদের কাছ থেকে শিখি!";

    // ─────────────────────────────────────────
    //  ৭. বই সংক্রান্ত
    // ─────────────────────────────────────────
    if (
      /(kototgulo boi|কতগুলো বই|how many books|total books)/.test(t) &&
      books.length
    ) {
      return `📚 এই মুহূর্তে Books Vibes-এ মোট **${books.length}টি বই** আছে।`;
    }

    if (/(সব বই|all books|সকল বই|book list|show all)/.test(t) && books.length) {
      const list = books
        .slice(0, 10)
        .map(
          (b, i) => `${i + 1}. **${b.bookName}** — ${b.author} ⭐${b.rating}`,
        )
        .join("\n");
      return `📚 আমাদের সংগ্রহে **${books.length}টি বই** আছে:\n\n${list}${books.length > 10 ? "\n\n...এবং আরও অনেক বই!" : ""}`;
    }

    if (
      /(সেরা বই|best book|highest rated|top book|সব চেয়ে ভালো)/.test(t) &&
      books.length
    ) {
      const sorted = [...books].sort((a, b) => b.rating - a.rating).slice(0, 3);
      const list = sorted
        .map(
          (b, i) => `${i + 1}. **${b.bookName}** ⭐${b.rating}/5 — ${b.author}`,
        )
        .join("\n");
      return `🏆 **সর্বোচ্চ রেটিং পাওয়া বইগুলো:**\n\n${list}`;
    }

    if (
      /(recommend|রিকমেন্ড|suggest|কী পড়বো|ki porbo|কোন বই পড়বো)/.test(t) &&
      books.length
    ) {
      const top = [...books].sort((a, b) => b.rating - a.rating)[0];
      return `📖 আমি সুপারিশ করবো **${top.bookName}**!\n\n✍️ লেখক: ${top.author}\n⭐ রেটিং: ${top.rating}/5\n📄 পৃষ্ঠা: ${top.totalPages}\n\nএটা আমাদের সংগ্রহের সেরা রেটিং পাওয়া বই!`;
    }

    if (/(fantasy|ফ্যান্টাসি)/.test(t) && books.length) {
      const found = books.filter(
        (b) => b.category?.toLowerCase() === "fantasy",
      );
      if (found.length)
        return `🧙 **Fantasy বইগুলো:**\n\n${found.map((b) => `• **${b.bookName}** — ${b.author} ⭐${b.rating}`).join("\n")}`;
    }

    if (/(classic|ক্লাসিক)/.test(t) && books.length) {
      const found = books.filter(
        (b) => b.category?.toLowerCase() === "classic",
      );
      if (found.length)
        return `📜 **Classic বইগুলো:**\n\n${found.map((b) => `• **${b.bookName}** — ${b.author} ⭐${b.rating}`).join("\n")}`;
    }

    if (/(fiction|ফিকশন)/.test(t) && books.length) {
      const found = books.filter(
        (b) => b.category?.toLowerCase() === "fiction",
      );
      if (found.length)
        return `📗 **Fiction বইগুলো:**\n\n${found.map((b) => `• **${b.bookName}** — ${b.author} ⭐${b.rating}`).join("\n")}`;
    }

    if (books.length) {
      const byName = books.find((b) =>
        userInput.toLowerCase().includes(b.bookName.toLowerCase()),
      );
      if (byName) return bookDetail(byName);

      const byAuthor = books.find((b) =>
        userInput.toLowerCase().includes(b.author.toLowerCase()),
      );
      if (byAuthor) return bookDetail(byAuthor);
    }

    // ─────────────────────────────────────────
    //  👨‍💻 ডেভেলপারের ব্যক্তিগত তথ্য (স্মার্ট রেসপন্স)
    // ─────────────────────────────────────────

    if (
      /(রিয়াদের ফোন|রিয়াদ এর ফোন|riad phone|রিয়াদ মোবাইল|01314674108|ফোন নম্বর দাও|phone number dao|মোবাইল নম্বর|contact number|রিয়াদ এর নম্বর|রিয়াদ এর মোবাইল)/.test(
        t,
      )
    ) {
      return `📞 **রিয়াদের ফোন নম্বর:**\n\n01314674108\n\n📧 ইমেইলও দরকার হলে বলবেন!`;
    }

    if (
      /(রিয়াদের ইমেইল|riad email|ইমেইল দাও|email address|djriad157764|রিয়াদ এর মেইল|মেইল কি|ই-মেইল)/.test(
        t,
      )
    ) {
      return `📧 **রিয়াদের ইমেইল ঠিকানা:**\n\ndjriad157764@gmail.com\n\n📞 ফোন নম্বরও দরকার হলে বলবেন!`;
    }

    if (
      /(রিয়াদ কি করে|riad ki kore|রিয়াদের পেশা|riad er profession|কাজ কি|কি কাজ করে|পেশা কি|কি করেন|কাজ করেন কি|web development করছে|web development করে|ডেভেলপার হিসেবে কাজ|full stack|ফুল স্ট্যাক)/.test(
        t,
      )
    ) {
      return `👨‍💻 **রিয়াদ কী করেন?**\n\nরিয়াদ বর্তমানে **Full-Stack Web Developer** হওয়ার জন্য প্রস্তুতি নিচ্ছেন。\n\n✅ **বর্তমান কার্যক্রম:**\n• Web Development শিখছেন\n• React.js, JavaScript, Tailwind CSS নিয়ে কাজ করছেন\n• Books Vibes এর মতো প্রজেক্ট বানাচ্ছেন\n• Programming Hero তে পড়াশোনা করছেন\n\n🎯 লক্ষ্য: একজন দক্ষ ফুল-স্ট্যাক ডেভেলপার হওয়া!`;
    }

    if (
      /(কোথায় শিখছে|কোথায় পড়ে|কোথায় পড়াশোনা করে|কোথায় শেখে|কোন জায়গায় শিখে|কোন প্ল্যাটফর্মে|programming hero তে পড়ে|কোথায় ওয়েব ডেভেলপমেন্ট শিখছে|শিক্ষা প্রতিষ্ঠান|কোথায় করছে|কোর্স কোথায় করছে)/.test(
        t,
      )
    ) {
      return `🎓 **রিয়াদ কোথায় শিখছে?**\n\nরিয়াদ **Programming Hero** -এ Web Development Course (Batch 13) করছেন।\n\n🏆 **Programming Hero সম্পর্কে:**\n• বাংলাদেশের সবচেয়ে জনপ্রিয় অনলাইন লার্নিং প্ল্যাটফর্ম\n• হাজার হাজার ডেভেলপার তৈরি করেছে\n• জাহিদুল ইসলাম (Jhankar Mahbub) প্রতিষ্ঠাতা\n• আধুনিক ও প্র্যাকটিক্যাল কারিকুলাম\n\n🚀 রিয়াদ এখান থেকে React, Node.js, MongoDB, Tailwind CSS সহ আধুনিক ওয়েব টেকনোলজি শিখছেন!`;
    }

    if (
      /(programming hero er malik|প্রোগ্রামিং হিরোর মালিক|ph এর মালিক|jankar mahbub|জাহিদুল ইসলাম|ঝংকার মাহবুব|programming hero founder|প্রোগ্রামিং হিরো কে বানিয়েছে|কে বানিয়েছে প্রোগ্রামিং হিরো|programming hero এর স্রষ্টা)/.test(
        t,
      )
    ) {
      return `👨‍🏫 **Programming Hero এর প্রতিষ্ঠাতা:**\n\n**জাহিদুল ইসলাম (Jhankar Mahbub)**\n\n📌 **তাঁর সম্পর্কে:**\n• বাংলাদেশের প্রখ্যাত সফটওয়্যার ইঞ্জিনিয়ার\n• প্রোগ্রামিং হিরোর প্রতিষ্ঠাতা ও CEO\n• দক্ষিণ কোরিয়ার কাইস্ট (KAIST) থেকে পিএইচডি\n• মাইক্রোসফট, গুগল, এনভিডিয়ায় কাজ করেছেন\n• হাজার হাজার তরুণ প্রোগ্রামার তৈরি করেছেন\n\n📚 উনার লেখা "প্রোগ্রামিং হিরো" বইটি বাংলাদেশের বেস্টসেলার!\n\n🙏 রিয়াদ উনার কাছ থেকেই Web Development শিখছেন!`;
    }

    if (
      /(রিয়াদের গ্রাম|রিয়াদ এর গ্রাম|গ্রামের নাম কি|এমাদপুর|মিঠাপুকুর|কোন গ্রামে|জন্মস্থান কোথায়|বাড়ি কোথায়|রিয়াদের বাড়ি|কোথায় থাকে গ্রামে)/.test(
        t,
      )
    ) {
      return `📍 **রিয়াদের গ্রাম ও জন্মস্থান:**\n\n🏠 **গ্রাম:** এমাদপুর\n🗺️ **উপজেলা:** মিঠাপুকুর\n🏙️ **জেলা:** রংপুর\n🌍 **দেশ:** বাংলাদেশ\n\nবর্তমানে থাকেন: **মনিপুর, গাজীপুর, ঢাকা** (প্রশিক্ষণের জন্য)`;
    }

    if (
      /(রিয়াদের জেলা|রিয়াদ এর জেলা|কোন জেলায়|জেলা কি|জেলার নাম|মিঠাপুকুর কোন জেলায়|রংপুর|রংপুর জেলা)/.test(
        t,
      )
    ) {
      return `🗺️ **রিয়াদের জেলা:**\n\n**রংপুর জেলা**\n\n📌 বিস্তারিত:\n• উপজেলা: মিঠাপুকুর\n• গ্রাম: এমাদপুর\n• বিভাগ: রংপুর বিভাগ\n• দেশ: বাংলাদেশ\n\nরংপুর বাংলাদেশের একটি ঐতিহাসিক জেলা!`;
    }

    if (
      /(রিয়াদের দেশ|রিয়াদ এর দেশ|কোন দেশে|দেশ কি|কান্ট্রি কি|বাংলাদেশ|বাংলাদেশি|বাংলাদেশী|কোন দেশের মানুষ)/.test(
        t,
      )
    ) {
      return `🌍 **রিয়াদের দেশ:**\n\n**বাংলাদেশ** 🇧🇩\n\n📌 তথ্য:\n• জাতীয়তা: বাংলাদেশী\n• বর্তমান অবস্থান: গাজীপুর, ঢাকা\n• জন্মস্থান: রংপুর\n\nগর্বের সাথে বলেন তিনি একজন বাংলাদেশী!`;
    }

    if (
      /(কোথায় ওয়েব ডেভেলপমেন্ট শিখছে|কোথায় শিখছে ওয়েব ডেভেলপমেন্ট|কোন কোর্স করছে|কোন ব্যাচে পড়ে|বি১৩|batch 13|ওয়েব ডেভেলপমেন্ট কোর্স|কি কোর্স করছে)/.test(
        t,
      )
    ) {
      return `💻 **রিয়াদের ওয়েব ডেভেলপমেন্ট লার্নিং বিস্তারিত:**\n\n📚 **প্রতিষ্ঠান:** Programming Hero\n📖 **কোর্স:** Complete Web Development Course\n🔢 **ব্যাচ:** Batch 13\n📅 **বর্তমান অবস্থা:** চলমান (In Progress)\n\n✅ **শিখছে যা যা:**\n• HTML5, CSS3, Tailwind CSS\n• JavaScript (ES6)\n• React.js\n• Node.js, Express.js\n• MongoDB\n• Firebase Authentication\n• REST API\n\n🎯 লক্ষ্য: ২০২৫ সালের মধ্যে প্রফেশনাল ফুল-স্ট্যাক ডেভেলপার হওয়া!`;
    }

    if (
      /(বর্তমান ঠিকানা|কোথায় থাকে এখন|এখন কোথায় থাকো|গাজীপুর|মনিপুর|ঢাকায় কোথায় থাকে|বর্তমান অবস্থান|লোকেশন কি)/.test(
        t,
      )
    ) {
      return `🏠 **রিয়াদের বর্তমান অবস্থান:**\n\n📍 **ঠিকানা:** মনিপুর, গাজীপুর, ঢাকা\n\n📌 বিস্তারিত:\n• ওয়েব ডেভেলপমেন্ট প্রশিক্ষণের জন্য এখানে আছেন\n• গাজীপুরের মনিপুর এলাকায় থাকেন\n• ঢাকা শহরের কাছাকাছি\n\nগ্রামের বাড়ি: এমাদপুর, মিঠাপুকুর, রংপুর`;
    }

    if (
      /(রিয়াদের স্কিলস|রিয়াদ কি জানে|কি কি পারে|দক্ষতা কি|স্কিলস কি|টেকনোলজি জানে|কি টেকনোলজি শিখেছে)/.test(
        t,
      )
    ) {
      return `🚀 **রিয়াদের দক্ষতা (Skills):**\n\n✅ **ফ্রন্ট-এন্ড:**\n• React.js\n• JavaScript (ES6)\n• Tailwind CSS\n• HTML5, CSS3\n\n✅ **ব্যাক-এন্ড:**\n• Node.js (লার্নিং)\n• Express.js (লার্নিং)\n\n✅ **ডাটাবেজ:**\n• MongoDB (লার্নিং)\n\n✅ **টুলস:**\n• Git & GitHub\n• VS Code\n• Firebase\n\n📈 ক্রমাগত শিখতে থাকা একজন ডেভেলপার!`;
    }

    if (
      /(programming hero কি|পিএইচ কি|প্রোগ্রামিং হিরো মানে|programming hero সম্পর্কে বলো|ph সম্পর্কে জানতে চাই)/.test(
        t,
      )
    ) {
      return `🌟 **Programming Hero সম্পর্কে:**\n\n**প্রোগ্রামিং হিরো** বাংলাদেশের একটি জনপ্রিয় অনলিন লার্নিং প্ল্যাটফর্ম।\n\n📌 **বিশেষত্ব:**\n• প্রতিষ্ঠাতা: Jhankar Mahbub (জাহিদুল ইসলাম)\n• লক্ষ্য: তরুণদের প্রোগ্রামিং শেখানো\n• কোর্স: Web Development, App Development\n• ব্যাচ: ১৩তম ব্যাচ চলছে\n\n🏆 **সাফল্য:**\n• হাজার হাজার প্রফেশনাল ডেভেলপার তৈরি করেছে\n• বাংলাদেশের বেস্টসেলার "প্রোগ্রামিং হিরো" বই\n• ফ্রিল্যান্সিং ও জব প্লেসমেন্টে সাহায্য\n\nরিয়াদ এখানেই Web Development শিখছেন!`;
    }

    if (
      /(রিয়াদ কে|রিয়াদ পরিচয়|রিয়াদ সম্পর্কে বলো|কে এই রিয়াদ|মোহাম্মদ রিয়াদ|রিয়াদের বায়ো)/.test(
        t,
      )
    ) {
      return `👨‍💻 **মোহাম্মদ রিয়াদ শেখ (Mohammad Riad Shekh)**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📌 **প্রোফাইল স্মারি:**\n\n👤 **নাম:** Mohammad Riad Shekh\n🎂 **জন্মস্থান:** এমাদপুর, মিঠাপুকুর, রংপুর\n🏠 **বর্তমান ঠিকানা:** মনিপুর, গাজীপুর, ঢাকা\n📞 **ফোন:** 01314674108\n📧 **ইমেইল:** djriad157764@gmail.com\n🌍 **জাতীয়তা:** বাংলাদেশী\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🎓 **ক্যারিয়ার ও শিক্ষা:**\n\n💻 **প্রোগ্রামিং হিরো** - Web Development (Batch 13)\n🎯 **বর্তমান ভূমিকা:** Full-Stack Web Developer (In Progress)\n🚀 **স্কিলস:** React, JavaScript, Tailwind CSS, Node.js, Firebase\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📚 **তথ্য:**\n• একজন উত্সাহী ওয়েব ডেভেলপার\n• Programming Hero থেকে শিখছেন\n• Books Vibes প্রজেক্টের creator\n• নিজের স্কিল ডেভেলপ করতে চান\n• ভবিষ্যতে সফটওয়্যার ইঞ্জিনিয়ার হওয়ার স্বপ্ন দেখেন\n\n📖 **মূলমন্ত্র:** "কখনো শেখা থামিও না!"`;
    }

    if (
      /(রিয়াদ|riad|developer|ডেভেলপার|স্রষ্টা|বানিয়েছে|তৈরি করেছে)/.test(t)
    ) {
      return `👨‍💻 **রিয়াদ সম্পর্কে জানতে চান?**\n\nআমি বলতে পারি:\n\n✅ "রিয়াদের ফোন নম্বর দাও" → ফোন নম্বর পাবেন\n✅ "রিয়াদের ইমেইল দাও" → ইমেইল পাবেন\n✅ "রিয়াদ কী করে?" → পেশা সম্পর্কে জানবেন\n✅ "কোথায় শিখছে?" → শিক্ষা প্রতিষ্ঠান জানবেন\n✅ "প্রোগ্রামিং হিরোর মালিক কে?" → Jhankar Mahbub সম্পর্কে জানবেন\n✅ "রিয়াদের গ্রাম কোনটি?" → জন্মস্থান জানবেন\n✅ "রিয়াদের স্কিলস কি?" → দক্ষতা জানবেন\n\nযে বিষয়ে জানতে চান, সেটা সুনির্দিষ্ট করে বলুন! 😊`;
    }

    return null;
  };

  // মূল উত্তর প্রদান ফাংশন
  const getBotReply = (userInput) => {
    const t = userInput.toLowerCase().trim();

    // ইউজার যদি স্কিপ করতে চায়
    if (
      t === "skip" ||
      t === "বাদ দিন" ||
      t === "না" ||
      t === "না দিতে চাই" ||
      t === "skip learning"
    ) {
      if (waitingForAnswer) {
        skipLearning();
        return null;
      }
    }

    // চেক করা হচ্ছে ইউজার আগের প্রশ্নের উত্তর দিচ্ছে কিনা
    if (waitingForAnswer) {
      if (
        userInput.trim().length > 0 &&
        userInput.trim() !== "skip" &&
        userInput.trim() !== "বাদ দিন"
      ) {
        const userAnswer = userInput;
        const question = waitingForAnswer;
        setWaitingForAnswer(null);
        setShowSkipOption(false);
        return learnFromUser(question, userAnswer);
      } else if (userInput.trim() === "") {
        return "❗ দয়া করে একটি উত্তর লিখুন বা 'বাদ দিন' বাটনে ক্লিক করুন।";
      }
    }

    // প্রথমে নলেজ বেস থেকে খোঁজা
    const knownAnswer = findAnswerInKnowledgeBase(userInput);
    if (knownAnswer) {
      return knownAnswer;
    }

    // বেসিক উত্তর খোঁজা
    const basicReply = getBasicReply(userInput, t);
    if (basicReply) {
      return basicReply;
    }

    // না জানলে ইউজারকে প্রশ্ন করা
    return askUserForAnswer(userInput);
  };

  const updateKnowledgeEntry = (id, newQuestion, newAnswer) => {
    setKnowledgeBase((prev) =>
      prev.map((item) =>
        item.id === id ?
          {
            ...item,
            question: newQuestion,
            answer: newAnswer,
            timestamp: new Date().toLocaleString(),
            status: "approved",
          }
        : item,
      ),
    );
    setEditingItem(null);
  };

  const deleteKnowledgeEntry = (id) => {
    if (window.confirm("আপনি কি এই এন্ট্রি ডিলিট করতে চান?")) {
      setKnowledgeBase((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input };
    const currentInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    await new Promise((res) => setTimeout(res, 400));
    const reply = getBotReply(currentInput);
    if (reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: "🧹 চ্যাট পরিষ্কার করা হয়েছে! নতুন করে প্রশ্ন করতে পারো। 📚",
      },
    ]);
    setWaitingForAnswer(null);
    setShowSkipOption(false);
  };

  const exportData = () => {
    const data = {
      knowledgeBase,
      exportDate: new Date().toISOString(),
      totalEntries: knowledgeBase.length,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chatbot_knowledge_base_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.knowledgeBase) {
          setKnowledgeBase(data.knowledgeBase);
          alert(
            `✅ ${data.knowledgeBase.length}টি প্রশ্ন-উত্তর সফলভাবে ইম্পোর্ট করা হয়েছে!`,
          );
        } else {
          alert("❌ ভুল ফাইল ফরম্যাট!");
        }
      } catch (error) {
        alert("❌ ভুল ফাইল ফরম্যাট!");
      }
    };
    reader.readAsText(file);
  };

  const quickQuestions = [
    { text: "📚 সব বই", query: "সব বই দেখাও" },
    { text: "⭐ সেরা বই", query: "সেরা বই কোনটি?" },
    { text: "🎭 Fantasy", query: "Fantasy বই আছে?" },
    { text: "🌐 এই সাইট কী?", query: "Books Vibes সম্পর্কে বলো" },
  ];

  return (
    <>
      {/* চ্যাটবট প্যানেল */}
      <div className="fixed bottom-24 right-6 w-[450px] h-[650px] bg-gray-900 rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden z-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-white">Books Vibes AI</h3>
                <p className="text-xs text-blue-200">
                  🧠 {knowledgeBase.length}টি বিষয় জানি • শিখতে পারি!
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowKnowledgePanel(!showKnowledgePanel)}
                className="text-white/60 hover:text-white transition-colors relative"
                title="নলেজ বেস দেখুন"
              >
                <FaDatabase size={16} />
              </button>
              <button
                onClick={handleClear}
                className="text-white/60 hover:text-white transition-colors"
                title="Chat মুছো"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-1 mb-1">
                    <FaRobot className="text-xs text-blue-400" />
                    <span className="text-xs text-blue-400">
                      Books Vibes AI
                    </span>
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="flex items-center gap-1 mb-1 justify-end">
                    <span className="text-xs text-blue-300">আপনি</span>
                    <FaUser className="text-xs text-blue-300" />
                  </div>
                )}
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {waitingForAnswer && showSkipOption && (
            <div className="flex justify-center gap-2 mt-2">
              <button
                onClick={skipLearning}
                className="px-4 py-2 bg-red-600/70 hover:bg-red-600 rounded-lg text-xs flex items-center gap-2 transition-all"
              >
                <FaTimesCircle size={12} /> বাদ দিন (শিখতে চাই না)
              </button>
            </div>
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-700">
                <div className="flex gap-1 items-center px-1">
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-4 py-2 border-t border-gray-800">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q.query)}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs whitespace-nowrap transition-all text-gray-300"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                waitingForAnswer ?
                  "উত্তর লিখুন অথবা 'বাদ দিন' বাটনে ক্লিক করুন..."
                : "আপনার প্রশ্ন লিখুন..."
              }
              rows="1"
              className="flex-1 p-2 bg-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ maxHeight: "100px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            🧠 আমি শিখতে পারি! • উত্তর জানলে শিখিয়ে দিন, না জানলে "বাদ দিন"
            ক্লিক করুন
          </p>
        </div>
      </div>

      {/* নলেজ বেস ম্যানেজমেন্ট প্যানেল */}
      {showKnowledgePanel && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]">
          <div className="bg-gray-900 rounded-2xl w-[700px] max-h-[85vh] flex flex-col shadow-2xl border border-gray-700">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white flex items-center gap-2">
                  <FaDatabase /> নলেজ বেস ম্যানেজমেন্ট
                </h3>
                <p className="text-xs text-purple-200">
                  মোট {knowledgeBase.length}টি প্রশ্ন-উত্তর • আপনি এডিট/ডিলিট
                  করতে পারবেন
                </p>
              </div>
              <button
                onClick={() => setShowKnowledgePanel(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-4 border-b border-gray-800 flex gap-2 flex-wrap">
              <button
                onClick={exportData}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm flex items-center gap-2"
              >
                <FaDownload /> এক্সপোর্ট JSON
              </button>
              <label className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center gap-2 cursor-pointer">
                <FaUpload /> ইম্পোর্ট JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
              <div className="text-xs text-gray-500 ml-auto flex items-center">
                📊 {knowledgeBase.filter((k) => k.taughtBy === "user").length}টি
                ইউজার শেখানো
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {knowledgeBase.length === 0 ?
                <div className="text-center text-gray-500 py-8">
                  <FaQuestionCircle className="text-4xl mx-auto mb-2" />
                  <p>নলেজ বেস খালি!</p>
                </div>
              : knowledgeBase.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800 rounded-lg p-3 border border-gray-700"
                  >
                    {editingItem === item.id ?
                      <div className="space-y-2">
                        <input
                          type="text"
                          defaultValue={item.question}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              question: e.target.value,
                            })
                          }
                          className="w-full p-2 bg-gray-700 rounded text-white text-sm"
                          placeholder="প্রশ্ন"
                        />
                        <textarea
                          defaultValue={item.answer}
                          onChange={(e) =>
                            setEditForm({ ...editForm, answer: e.target.value })
                          }
                          className="w-full p-2 bg-gray-700 rounded text-white text-sm"
                          rows="3"
                          placeholder="উত্তর"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const newQuestion =
                                editForm.question || item.question;
                              const newAnswer = editForm.answer || item.answer;
                              updateKnowledgeEntry(
                                item.id,
                                newQuestion,
                                newAnswer,
                              );
                            }}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm flex items-center gap-1"
                          >
                            <FaSave size={12} /> সংরক্ষণ
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm flex items-center gap-1"
                          >
                            <FaTimes size={12} /> বাতিল
                          </button>
                        </div>
                      </div>
                    : <>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300">
                                {item.taughtBy === "user" ?
                                  "👤 ইউজার শেখানো"
                                : "🤖 সিস্টেম"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.timestamp}
                              </span>
                            </div>
                            <p className="font-medium text-blue-400 text-sm">
                              ❓ {item.question}
                            </p>
                            <div className="mt-2 p-2 bg-gray-700/50 rounded">
                              <p className="text-xs text-green-400 mb-1">
                                ✅ উত্তর:
                              </p>
                              <p className="text-sm text-gray-300">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={() => {
                                setEditingItem(item.id);
                                setEditForm({
                                  question: item.question,
                                  answer: item.answer,
                                });
                              }}
                              className="p-1.5 bg-yellow-600/50 hover:bg-yellow-600 rounded text-white"
                              title="এডিট"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => deleteKnowledgeEntry(item.id)}
                              className="p-1.5 bg-red-600/50 hover:bg-red-600 rounded text-white"
                              title="ডিলিট"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                ))
              }
            </div>

            <div className="p-4 border-t border-gray-800 text-center">
              <p className="text-xs text-gray-500">
                💡 আপনি সব প্রশ্ন ও উত্তর দেখতে, এডিট করতে এবং ডিলিট করতে
                পারবেন।
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GemmaChatbot;
