import { useState } from "react";
import { 
  IoChevronDown, 
  IoSearch, 
  IoCarSport, 
  IoRefresh, 
  IoBag, 
  IoCard, 
  IoMail, 
  IoChatbubbleEllipses 
} from "react-icons/io5";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "shipping", label: "Shipping & Delivery", icon: IoCarSport },
  { id: "returns", label: "Returns & Refunds", icon: IoRefresh },
  { id: "orders", label: "Orders & Cart", icon: IoBag },
  { id: "payment", label: "Payment & COD", icon: IoCard },
];

const FAQ_DATA: FAQItem[] = [
  {
    id: "1",
    category: "shipping",
    question: "How long does shipping take?",
    answer: "Standard shipping usually takes 2-5 business days depending on your location. You will receive a tracking link via email as soon as your order ships.",
  },
  {
    id: "2",
    category: "shipping",
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes! We support Cash on Delivery for most regions. You can select COD during checkout.",
  },
  {
    id: "3",
    category: "returns",
    question: "What is your return policy?",
    answer: "We offer a 14-day hassle-free return policy for unopened and unused products in their original packaging.",
  },
  {
    id: "4",
    category: "returns",
    question: "How do I request a refund?",
    answer: "You can initiate a return by contacting our customer support team or submitting a request via the Contact Us section with your order ID.",
  },
  {
    id: "5",
    category: "orders",
    question: "Can I cancel or change my order after placing it?",
    answer: "If your order has not been dispatched yet, you can contact our support team immediately to cancel or modify your items.",
  },
  {
    id: "6",
    category: "payment",
    question: "What payment methods are supported?",
    answer: "We accept Cash on Delivery (COD), major Credit/Debit Cards (Visa, Mastercard), and digital payment gateways.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>("1");

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 pb-12 pt-20 px-6 xl:px-0">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Top Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How can we <span className=" text-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text dark:text-transparent">help you?</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Search our knowledge base or browse frequently asked questions below to find quick answers.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto pt-4">
            <IoSearch className="absolute left-3.5 top-[38px] transform -translate-y-1/2 text-gray-400 text-base" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? " bg-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
              >
                {Icon && <Icon className="text-base" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-900 bg-gray-50 dark:text-white hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold">{faq.question}</span>
                    <IoChevronDown
                      className={`text-indigo-500 shrink-0 transition-transform duration-200 text-base ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm">
              No matching questions found. Try searching for something else!
            </div>
          )}
        </div>

        {/* Still Need Help? Section */}
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-10 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Can’t find the answer you’re looking for? Please reach out to our friendly team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
            <div className="p-4 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-800/50 flex items-start gap-3">
              <IoMail className="text-indigo-500 shrink-0 mt-0.5 text-lg" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Email Support</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Response within 24 hours</p>
                <a href="mailto:support@store.com" className="text-xs text-indigo-500 font-medium hover:underline mt-2 inline-block">
                  support@store.com
                </a>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-800/50 flex items-start gap-3">
              <IoChatbubbleEllipses className="text-indigo-500 shrink-0 mt-0.5 text-lg" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Chat</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Mon - Fri from 8am to 5pm</p>
                <a href="#contact" className="text-xs text-indigo-500 font-medium hover:underline mt-2 inline-block">
                  Start a Chat
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}