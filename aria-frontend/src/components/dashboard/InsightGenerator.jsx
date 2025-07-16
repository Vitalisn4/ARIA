import React, { useState } from "react";
import api from "../../services/api";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { Sparkles } from "lucide-react";

const InsightGenerator = () => {
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setInsight("");
    try {
      const response = await api.post("/health/generate-insight");
      setInsight(response.data.insight);
      setIsModalOpen(true);
    } catch (error) {
      setInsight("Sorry, I couldn't generate an insight right now.");
      setIsModalOpen(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card icon={<Sparkles />} title="Generate Insight">
        <p className="text-slate-300 mb-4 text-sm">
          Let ARIA analyze your recent data to find patterns and provide
          actionable advice.
        </p>
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Generate AI Insight"}
        </Button>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-bold text-white mb-4">Your ARIA Insight</h3>
        <p className="text-slate-300 whitespace-pre-wrap">{insight}</p>
      </Modal>
    </>
  );
};
export default InsightGenerator;
