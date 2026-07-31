import type { ReactNode } from "react";

type FooterProps = {
  version: string;
  githubUrl?: string;
  linkedinUrl?: string;
  contactEmail?: string;
};

type FooterIconLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
};

function FooterIconLink({
  href,
  label,
  external = false,
  children,
}: FooterIconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        flex size-9 items-center justify-center
        rounded-full border border-[#3a363d]
        text-[#8f878d] transition
        hover:border-[#c97c91]
        hover:text-[#c97c91]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#c97c91]
      "
    >
      {children}
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 fill-current"
    >
      <path d="M12 .7C5.7.7.6 5.8.6 12.1c0 5 3.2 9.2 7.7 10.7.6.1.8-.3.8-.6v-2.3c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.3.9.1-.8.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 .9-.3 3.1 1.1a10.6 10.6 0 0 1 5.6 0c2.1-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.3-5.2 5.6.4.4.8 1.1.8 2.1v3.1c0 .4.2.8.8.6a11.5 11.5 0 0 0 7.7-10.7C23.4 5.8 18.3.7 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 fill-current"
    >
      <path d="M5.3 7.8H1.8V22h3.5V7.8ZM3.5 1.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM22.2 13.9c0-4.3-2.3-6.3-5.4-6.3a4.7 4.7 0 0 0-4.2 2.3V7.8H9.1V22h3.5v-7c0-1.8.3-3.6 2.6-3.6s2.3 2.1 2.3 3.7V22H21v-8.1Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />

      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function Footer({
  version,
  githubUrl,
  linkedinUrl,
  contactEmail,
}: FooterProps) {
  return (
    <footer className="border-t border-[#3a363d] bg-[#181719]">
      <div
        className="
          mx-auto grid w-[calc(100%-2rem)]
          max-w-[1600px] gap-4 py-6
          text-sm text-[#8f878d]
          sm:grid-cols-[1fr_auto_1fr]
          sm:items-center
        "
      >
        <p className="text-center sm:text-left">
          {version}
        </p>

        <p className="text-center">
          © 2026 myGlossary. Todos os direitos reservados.
        </p>

        <div
          className="
            flex min-h-9 items-center justify-center
            gap-3 sm:justify-end
          "
        >
          {githubUrl && (
            <FooterIconLink
              href={githubUrl}
              label="Abrir perfil no GitHub"
              external
            >
              <GitHubIcon />
            </FooterIconLink>
          )}

          {linkedinUrl && (
            <FooterIconLink
              href={linkedinUrl}
              label="Abrir perfil no LinkedIn"
              external
            >
              <LinkedInIcon />
            </FooterIconLink>
          )}

          {contactEmail && (
            <FooterIconLink
              href={`mailto:${contactEmail}`}
              label="Enviar e-mail"
            >
              <EmailIcon />
            </FooterIconLink>
          )}
        </div>
      </div>
    </footer>
  );
}