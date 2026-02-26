import { useState } from "react";

const faqs = [
  {
    question: "What is our return Policy?",
    answer:
      "We accept return before 7 days of delivery. The tag of the product should not b removed. The packaged box should be in the same condition as before.",
  },
  {
    question: "What are your business hours?",
    answer: "We are open Monday through Friday, 9:00 AM to 5:00 PM.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes, we offer free standard shipping on all orders over Rs.5000.",
  },
];

export default function Faq() {
  const [currrentIndex, setCurrentInndex] = useState();

  const toggleFaq = (index) => {
    setCurrentInndex(currrentIndex === index ?  null : index);
  };

  return (
    <>
      <div className="faq-container">
        <h2>FAQs</h2>
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${currrentIndex === index ? "active" : ""}`}
            key={index}
          >
            <div className="question" onClick={() => toggleFaq(index)}>
              {faq.question}
              <span className="arrow">{currrentIndex === index ? "−" : "+"}</span>
            </div>

            <div className="answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
