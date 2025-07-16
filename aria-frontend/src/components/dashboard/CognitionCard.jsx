import React from "react";
import Card from "../ui/Card";
import { MessageSquareQuote } from "lucide-react";

const CognitionCard = ({ cognitionData }) => {
  return (
    <Card icon={<MessageSquareQuote />} title="Cognition">
      <p className="text-slate-300 mb-2 text-sm">
        Your most recent thought or memory:
      </p>
      <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-slate-400">
        {cognitionData?.lastJournalEntry || "No entries yet."}
      </blockquote>
    </Card>
  );
};
export default CognitionCard;
