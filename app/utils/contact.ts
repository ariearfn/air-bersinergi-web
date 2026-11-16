const DEFAULT_WA_TEXT = 'Halo, saya ingin bertanya mengenai layanan PT. Air Bersinergi.'

/** WhatsApp click-to-chat link; accepts numbers with or without +, spaces, dashes. */
export function waLink(number: string | null | undefined, text = DEFAULT_WA_TEXT) {
  const digits = (number ?? '').replace(/\D/g, '').replace(/^0/, '62')
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : ''
}

export function mapsEmbedUrl(address: string | null | undefined) {
  return address ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed` : ''
}
