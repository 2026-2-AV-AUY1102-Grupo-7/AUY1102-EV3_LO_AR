import { MotherCreator } from './MotherCreator';

export class WordMother {
  static random(length = 5): string {
    // faker v10 falla si no existe una palabra de esa longitud (p. ej. 0)
    return length <= 0 ? '' : MotherCreator.random().lorem.word(length);
  }
}
