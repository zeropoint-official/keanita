'use client';

// Mirrors the RN app's icon-symbol: SF Symbol names → Material icons.
// On web we render the same Material glyphs via react-icons/md.

import type { CSSProperties } from 'react';
import {
  MdHome,
  MdSend,
  MdCode,
  MdChevronRight,
  MdChevronLeft,
  MdNotifications,
  MdNotificationsActive,
  MdEvent,
  MdStar,
  MdStarBorder,
  MdPerson,
  MdPeople,
  MdPlace,
  MdBrush,
  MdArticle,
  MdEdit,
  MdCreditCard,
  MdLock,
  MdPhone,
  MdHelp,
  MdSportsEsports,
  MdCardGiftcard,
  MdEmojiEvents,
  MdLocalFireDepartment,
  MdAutoAwesome,
  MdCheck,
  MdCheckCircle,
  MdClose,
  MdSchedule,
  MdQrCode2,
  MdSearch,
  MdFavorite,
  MdMail,
  MdPlayArrow,
  MdEco,
  MdAdd,
  MdArrowForward,
  MdConfirmationNumber,
  MdInfo,
  MdThumbUp,
} from 'react-icons/md';
import type { IconType } from 'react-icons';

const MAPPING = {
  'house.fill': MdHome,
  'paperplane.fill': MdSend,
  'chevron.left.forwardslash.chevron.right': MdCode,
  'chevron.right': MdChevronRight,
  'chevron.left': MdChevronLeft,
  'bell.fill': MdNotifications,
  'bell.badge.fill': MdNotificationsActive,
  calendar: MdEvent,
  'star.fill': MdStar,
  star: MdStarBorder,
  'person.fill': MdPerson,
  'person.2.fill': MdPeople,
  'mappin.and.ellipse': MdPlace,
  'paintbrush.fill': MdBrush,
  'newspaper.fill': MdArticle,
  pencil: MdEdit,
  'creditcard.fill': MdCreditCard,
  'lock.fill': MdLock,
  'phone.fill': MdPhone,
  questionmark: MdHelp,
  'gamecontroller.fill': MdSportsEsports,
  'gift.fill': MdCardGiftcard,
  'trophy.fill': MdEmojiEvents,
  'flame.fill': MdLocalFireDepartment,
  sparkles: MdAutoAwesome,
  checkmark: MdCheck,
  'checkmark.circle.fill': MdCheckCircle,
  xmark: MdClose,
  'clock.fill': MdSchedule,
  qrcode: MdQrCode2,
  magnifyingglass: MdSearch,
  'heart.fill': MdFavorite,
  'envelope.fill': MdMail,
  'play.fill': MdPlayArrow,
  'leaf.fill': MdEco,
  plus: MdAdd,
  'arrow.right': MdArrowForward,
  'ticket.fill': MdConfirmationNumber,
  'info.circle.fill': MdInfo,
  'hand.thumbsup.fill': MdThumbUp,
} satisfies Record<string, IconType>;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: CSSProperties;
}) {
  const Glyph = MAPPING[name] ?? MdHelp;
  return <Glyph size={size} color={color} style={style} />;
}
