import { FaGithub, FaWhatsapp, FaInstagram, FaDiscord } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export const contacts = [
  {
    id: 'email',
    label: 'Gmail',
    value: 'muristop@gmail.com',
    href: 'mailto:muristop@gmail.com',
    icon: MdEmail,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+55 54 99684-8291',
    href: 'https://wa.me/5554996848291',
    icon: FaWhatsapp,
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@muristop10',
    href: 'https://instagram.com/muristop10',
    icon: FaInstagram,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'muristop10',
    href: 'https://github.com/muristop10',
    icon: FaGithub,
    external: true,
  },
  {
    id: 'discord',
    label: 'Discord',
    value: 'muristop10',
    href: 'https://discord.com/users/887271434467045376',
    icon: FaDiscord,
    external: true,
  },
]
