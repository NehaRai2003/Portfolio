"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    };
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--text)] placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[var(--pink)] focus:bg-white/[0.07] focus:ring-4 focus:ring-pink-500/15";

  return (
    <div className="h-full rounded-3xl glass p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold">Send me a message</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{"I'll get back to you as soon as possible."}</p>
      <div className="mt-6 flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="cf-name">Your Name</label>
            <input
              id="cf-name"
              className={inputCls}
              type="text"
              placeholder="John Doe"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="cf-email">Your Email</label>
            <input
              id="cf-email"
              className={inputCls}
              type="email"
              placeholder="john@example.com"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && <p className="text-sm text-rose-400">Please provide a valid email!</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="cf-message">Your Message</label>
          <textarea
            id="cf-message"
            className={`${inputCls} resize-none`}
            placeholder="Hi there, I'd like to talk about..."
            maxLength="500"
            name="message"
            required={true}
            onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
            onBlur={checkRequired}
            rows="5"
            value={userInput.message}
          />
        </div>

        <div className="flex flex-col items-start gap-3">
          {error.required && <p className="text-sm text-rose-400">All fields are required!</p>}
          <button
            className="btn-primary w-full justify-center disabled:opacity-60 sm:w-auto"
            onClick={handleSendMail}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Sending Message...</span>
            ) : (
              <span className="flex items-center gap-2">
                Send Message
                <TbMailForward size={20} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
