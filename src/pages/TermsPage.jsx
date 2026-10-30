import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  Copyright,
  Download,
  AlertTriangle,
} from "lucide-react";

function TermsPage() {
  const sections = [
    {
      icon: ShieldCheck,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using bhorBox, you agree to these Terms of Use. If you do not agree with these terms, please discontinue using the website.",
        "These terms apply to all visitors and users of bhorBox.",
      ],
    },
    {
      icon: FileText,
      title: "2. About the Platform",
      content: [
        "bhorBox is a visual discovery platform that provides access to photos, wallpapers, videos and GIFs through its own website features and third-party content services.",
        "The availability, quality and selection of content may change depending on external providers and their services.",
      ],
    },
    {
      icon: Copyright,
      title: "3. Copyright and Ownership",
      content: [
        "All third-party photographs, videos, GIFs, artwork and other media belong to their respective creators, copyright holders or licensors.",
        "bhorBox does not claim ownership of third-party media displayed through its platform.",
        "Displaying third-party content does not transfer copyright or ownership to bhorBox or its users.",
        "Users must respect the original creator's rights and applicable licensing conditions.",
      ],
    },
    {
      icon: Download,
      title: "4. Downloads and Content Usage",
      content: [
        "Where download functionality is available, users may access content subject to the applicable provider's license, permissions and restrictions.",
        "A downloadable file is not automatically free for every purpose. Users are responsible for checking whether their intended use is permitted.",
        "Users must not redistribute, resell, reproduce or commercially exploit content in ways that violate copyright or the original provider's terms.",
        "Some content may have provider-specific download requirements or attribution rules.",
      ],
    },
    {
      icon: ShieldCheck,
      title: "5. Third-Party Services and APIs",
      content: [
        "bhorBox may use third-party APIs and services, including Pexels, Unsplash and GIF content providers, to retrieve and display media.",
        "These services operate independently and are governed by their own terms, privacy policies and licensing requirements.",
        "bhorBox is not responsible for changes, interruptions, content removal, API limitations or availability issues caused by third-party services.",
        "Third-party trademarks, logos and content remain the property of their respective owners.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "6. User Responsibilities",
      content: [
        "You agree not to use bhorBox for unlawful activities or copyright infringement.",
        "You must not attempt to disrupt, damage, abuse or gain unauthorized access to the website or its services.",
        "You are responsible for verifying content permissions before using downloaded media in personal, commercial or public projects.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "7. Disclaimer and Availability",
      content: [
        "bhorBox is provided on an as-available basis. We do not guarantee uninterrupted access, error-free operation or the availability of particular media.",
        "We do not guarantee that third-party content is suitable for a specific purpose.",
        "To the extent permitted by applicable law, bhorBox is not liable for losses arising from third-party content, external service interruptions or unauthorized uses of media by users.",
      ],
    },
    {
      icon: FileText,
      title: "8. Changes to These Terms",
      content: [
        "We may update these terms as the website, features or applicable requirements change.",
        "Updated terms will be published on this page with a revised effective date. Continued use of the website after an update means you acknowledge the revised terms, subject to applicable law.",
      ],
    },
    {
      icon: FileText,
      title: "9. Contact",
      content: [
        "For questions about these terms, copyright concerns or website-related issues, please contact the bhorBox website administrator through the contact details provided on the website.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B101B] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <header className="mb-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs text-violet-300">
            <FileText size={14} />
            LEGAL INFORMATION
          </span>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Terms of Use
          </h1>

          <p className="mt-5 text-sm text-white/40">
            Effective date: October 30, 2026
          </p>

          <p className="mt-6 max-w-2xl leading-8 text-white/55">
            Please read these terms carefully before using bhorBox. They explain
            the basic rules, responsibilities and limitations associated with
            our platform.
          </p>
        </header>

        <div className="space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="rounded-2xl border border-white/10 bg-white/2.5 p-6 sm:p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icon size={20} className="shrink-0 text-violet-400" />

                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>

                <div className="space-y-3">
                  {section.content.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-7 text-white/50">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-12 text-center text-xs text-white/30">
          © 2026 bhorBox. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default TermsPage;
