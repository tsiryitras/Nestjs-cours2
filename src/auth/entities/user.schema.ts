import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Schema pour l'authentification
 * Ajouter l’extension Document pour le schema User pour ajouter l'_id
 */
@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
