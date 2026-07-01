import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

const Result = ({ dietPlan }) => {
  const [activeTab, setActiveTab] = useState("");
  const [sections, setSections] = useState({});

  useEffect(() => {
    if (!dietPlan) return;

    const splitSections = {};
    const regex = /## (.*?)\n([\s\S]*?)(?=(?:\n## )|$)/g;
    let match;

    while ((match = regex.exec(dietPlan)) !== null) {
      const title = match[1].trim();
      const content = match[2].trim();
      splitSections[title] = content;
    }

    setSections(splitSections);

    // Set first section as default active tab
    const firstKey = Object.keys(splitSections)[0];
    if (firstKey) {
      setActiveTab(firstKey);
    }
  }, [dietPlan]);

  const getCleanHtml = (markdown) => DOMPurify.sanitize(marked.parse(markdown));

  return (
    <div className="p-5 bg-green-50 border border-green-400 shadow-md rounded-xl mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center gap-2">
        🥗 Your Personalized Diet Plan
      </h2>

      {/* Generated Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(sections).map((title) => (
          <button
            key={title}
            onClick={() => setActiveTab(title)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === title
                ? "bg-green-600 text-white shadow"
                : "bg-white text-green-800 border border-green-300 hover:bg-green-100"
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div
        className="prose max-w-none text-gray-800 bg-white p-4 rounded-lg border border-gray-200"
        dangerouslySetInnerHTML={{
          __html: getCleanHtml(
            sections[activeTab] || "Select a section to view its content."
          ),
        }}
      />
    </div>
  );
};

export default Result;
