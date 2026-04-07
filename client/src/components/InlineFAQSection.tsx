"use client";
import { useState } from "react";
import { Link } from "@/lib/router";
import AutoLinkedText from "@/components/AutoLinkedText";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  icon?: string;
  faqs: FAQItem[];
}

export interface RelatedFAQLink {
  label: string;
  href: string;
  icon?: string;
}

interface InlineFAQSectionProps {
  title: string;
  faqs: FAQItem[];
  secondaryTitle?: string;
  secondaryFaqs?: FAQItem[];
  sections?: FAQSection[];
  relatedLinks?: RelatedFAQLink[];
  excludeUrls?: string[];
  bgClass?: string;
}

function FAQAccordion({
  faqs,
  prefix,
  excludeUrls,
}: {
  faqs: FAQItem[];
  prefix: string;
  excludeUrls: string[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(prefix === "primary" ? 0 : null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <article
          key={`${prefix}-${index}`}
          className="border border-gray-200 rounded-md overflow-hidden bg-white"
          data-testid={`faq-${prefix}-${index}`}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
            data-testid={`button-faq-${prefix}-${index}`}
          >
            <h3 className="font-semibold text-gray-900 pr-4" itemProp="name">{faq.question}</h3>
            <i
              className={`ri-arrow-down-s-line text-xl text-gray-500 transition-transform flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`}
              aria-hidden="true"
            ></i>
          </button>
          <div
            className={openIndex === index ? "px-6 pb-6" : "sr-only"}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <div itemProp="text">
              <AutoLinkedText
                text={faq.answer}
                as="div"
                className="text-gray-600 leading-relaxed"
                excludeUrls={excludeUrls}
                maxLinks={3}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function InlineFAQSection({
  title,
  faqs,
  secondaryTitle,
  secondaryFaqs,
  sections,
  relatedLinks,
  excludeUrls = [],
  bgClass = "bg-gray-50",
}: InlineFAQSectionProps) {
  if (faqs.length === 0 && (!sections || sections.length === 0)) return null;

  const useSections = sections && sections.length > 0;

  return (
    <section className={`py-20 ${bgClass}`} aria-label={title} data-testid="section-faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-faq-title">
            {title}
          </h2>
        </div>

        <div itemScope itemType="https://schema.org/FAQPage">
          {useSections ? (
            <>
              {sections.map((section, sIdx) => (
                section.faqs.length > 0 && (
                  <div key={sIdx} className={sIdx > 0 ? "mt-12" : ""}>
                    <div className="flex items-center gap-3 mb-6">
                      {section.icon && (
                        <div className="w-8 h-8 rounded-lg bg-[#ad023b]/10 flex items-center justify-center flex-shrink-0">
                          <i className={`${section.icon} text-[#ad023b]`} aria-hidden="true"></i>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900" data-testid={`text-faq-section-${sIdx}`}>
                        {section.title}
                      </h3>
                    </div>
                    <FAQAccordion
                      faqs={section.faqs}
                      prefix={`s${sIdx}`}
                      excludeUrls={excludeUrls}
                    />
                  </div>
                )
              ))}
            </>
          ) : (
            <>
              <FAQAccordion faqs={faqs} prefix="primary" excludeUrls={excludeUrls} />

              {secondaryTitle && secondaryFaqs && secondaryFaqs.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8" data-testid="text-unique-faq-title">
                    {secondaryTitle}
                  </h3>
                  <FAQAccordion faqs={secondaryFaqs} prefix="secondary" excludeUrls={excludeUrls} />
                </div>
              )}
            </>
          )}
        </div>

        {relatedLinks && relatedLinks.length > 0 && (
          <div className="mt-12 bg-white border border-gray-200 rounded-md p-6" data-testid="section-related-faqs">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-links-line text-[#ad023b]" aria-hidden="true"></i>
              Preguntas relacionadas
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-md border border-gray-100 hover:border-[#ad023b]/30 hover:bg-gray-50 transition-all group"
                  data-testid={`link-related-faq-${i}`}
                >
                  <i className={`${link.icon || "ri-question-answer-line"} text-lg text-[#ad023b]`} aria-hidden="true"></i>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#ad023b] transition-colors">{link.label}</span>
                  <i className="ri-arrow-right-s-line text-gray-400 ml-auto group-hover:text-[#ad023b] transition-colors" aria-hidden="true"></i>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
