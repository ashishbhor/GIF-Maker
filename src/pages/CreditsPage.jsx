import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Image,
  Video,
  Film,
  ExternalLink,
  Heart,
  Copyright,
  Code2,
} from "lucide-react";

function CreditsPage() {
  const providers = [
    {
      name: "Pexels",
      type: "Photos and Videos",
      description:
        "Pexels provides access to photography and video content through its API. The photographs and videos belong to their respective creators and rights holders.",
      website: "https://www.pexels.com/",
      api: "https://www.pexels.com/api/",
      icon: Video,
    },
    {
      name: "Unsplash",
      type: "Photography",
      description:
        "Unsplash provides access to a collection of photography through its API. Each photograph belongs to its respective photographer and is subject to applicable licensing and API requirements.",
      website: "https://unsplash.com/",
      api: "https://unsplash.com/developers",
      icon: Image,
    },
    {
      name: "Tenor",
      type: "GIFs and Animated Media",
      description:
        "GIF content displayed on bhorBox may be retrieved through a third-party GIF API. The original creators and respective rights holders retain ownership of their content. Source attribution is provided according to the provider's requirements.",
      website: "https://tenor.com/",
      api: "https://developers.google.com/tenor/guides/quickstart",
      icon: Film,
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

        <header className="mb-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs text-violet-300">
            <Heart size={14} />
            MADE POSSIBLE BY CREATORS
          </span>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Credits &
            <span className="block text-violet-400">Acknowledgements.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/55">
            Great visuals deserve great credit. bhorBox brings together content
            from different sources, and we appreciate the photographers,
            videographers, artists and creators who make this possible.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold">Content Sources</h2>

          <div className="space-y-4">
            {providers.map((provider) => {
              const Icon = provider.icon;

              return (
                <article
                  key={provider.name}
                  className="rounded-2xl border border-white/10 bg-white/2.5 p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-400">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {provider.name}
                        </h3>

                        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/45">
                          {provider.type}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-white/50">
                        {provider.description}
                      </p>

                      {(provider.website || provider.api) && (
                        <div className="mt-5 flex flex-wrap gap-5">
                          <a
                            href={provider.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-violet-300 transition hover:text-violet-200"
                          >
                            Official Website
                            <ExternalLink size={13} />
                          </a>

                          <a
                            href={provider.api}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-violet-300 transition hover:text-violet-200"
                          >
                            API Documentation
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-14 rounded-2xl border border-white/10 bg-white/2.5 p-7">
          <Copyright size={24} className="mb-4 text-violet-400" />

          <h2 className="text-xl font-semibold">
            Original Creators Own Their Work
          </h2>

          <p className="mt-4 text-sm leading-8 text-white/50">
            All photographs, videos, GIFs and other third-party media remain the
            property of their respective creators, copyright holders or
            licensors.
          </p>

          <p className="mt-3 text-sm leading-8 text-white/50">
            bhorBox does not claim ownership of these materials. We aim to
            acknowledge original sources and creators wherever the available API
            information and provider guidelines allow.
          </p>

          <p className="mt-3 text-sm leading-8 text-white/50">
            Content availability and permitted uses depend on the applicable
            license and the terms of the original content provider. Please check
            those terms before using media outside bhorBox.
          </p>
        </section>

        <section className="mb-14">
          <div className="flex items-center gap-3">
            <Code2 size={22} className="text-violet-400" />

            <h2 className="text-xl font-semibold">Built with Technology</h2>
          </div>

          <p className="mt-4 text-sm leading-8 text-white/50">
            bhorBox is developed using modern web technologies and open-source
            tools. We appreciate the developers and communities behind the
            technologies that make this project possible.
          </p>
        </section>

        <section className="rounded-2xl border border-violet-400/15 bg-violet-400/4 p-7">
          <h2 className="text-lg font-semibold">
            Copyright or Attribution Concerns?
          </h2>

          <p className="mt-3 text-sm leading-7 text-white/50">
            If you are a creator or rights holder and have a question about
            content displayed on bhorBox, please contact{" "}
            <a
              className="text-blue-400"
              href="mailto:[bhorv590@gmail.com]?subject=Hello&body=I%20have%20a%20question"
            >
              bhorv590@gmail.com
            </a>
          </p>
        </section>

        <p className="mt-12 text-center text-xs text-white/30">
          Thank you to every creator who makes the internet more creative.
        </p>

        <p className="mt-2 text-center text-xs text-white/30">
          © 2026 bhorBox. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default CreditsPage;
