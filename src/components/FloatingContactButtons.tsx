function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 0C5.39 0 0 5.39 0 12.04c0 2.123.555 4.198 1.605 6.03L0 24l6.095-1.596a11.99 11.99 0 0 0 5.945 1.57h.005c6.65 0 12.04-5.39 12.04-12.04C24.085 5.39 18.695 0 12.04 0zm0 22.05h-.005a9.974 9.974 0 0 1-5.085-1.393l-.365-.217-3.618.948.966-3.526-.238-.362A9.973 9.973 0 0 1 2.05 12.04c0-5.508 4.482-9.99 9.995-9.99 2.668 0 5.175 1.04 7.063 2.93a9.927 9.927 0 0 1 2.927 7.065c0 5.508-4.483 9.99-9.995 9.99z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function toWhatsAppDigits(value: string) {
  return value.replace(/\D/g, "");
}

export default function FloatingContactButtons({
  whatsapp,
  instagram,
}: {
  /** Either a raw phone number (e.g. "+91 90289 49398") or a full wa.me / api.whatsapp.com link. */
  whatsapp?: string;
  instagram?: string;
}) {
  if (!whatsapp && !instagram) return null;

  const whatsappHref = whatsapp
    ? whatsapp.startsWith("http")
      ? whatsapp
      : `https://wa.me/${toWhatsAppDigits(whatsapp)}`
    : undefined;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on Instagram"
          title="Instagram"
          className="tap-target flex h-12 w-12 items-center justify-center rounded-full text-white shadow-premium-lg transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14"
          style={{
            background:
              "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
          }}
        >
          <InstagramIcon />
        </a>
      )}
      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="WhatsApp"
          className="tap-target flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium-lg transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14"
        >
          <WhatsAppIcon />
        </a>
      )}
    </div>
  );
}
