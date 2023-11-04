import type { Audience, User } from '@prisma/client';

export interface Prayer {
  id: string;
  body: string;
  displayName?: string | undefined;
  username?: string;
  givenName?: string;
  surname?: string;
  email?: string;
  avatarUrl?: string;
  cell?: string | null | undefined;
  avatar?: string | null | undefined;
  saved?: any;
  isSavedInPrayerList?: any;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
  mentionedId: string;
  audience: Audience;
  cellId?: string;
  prayingCount?: number | null;
  prayerStats?: PrayerStats;
  optionToggleHidden?: boolean;
  mention?: { user: User; prayer: Prayer };
}

export interface PrayerStats {
  userAvatarUrls: string[];
  relevantSupporter: string;
  prayingCount: number;
}
