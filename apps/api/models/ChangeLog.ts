import { model, Schema } from 'mongoose';

interface ChangeLog {
  content: string;
  source?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const changelogSchema = new Schema<ChangeLog>({
  content: { type: String, required: true },
  source: { type: String, default: 'cli' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const ChannelLogModel = model<ChangeLog>('Channellog', changelogSchema, 'channellogs')