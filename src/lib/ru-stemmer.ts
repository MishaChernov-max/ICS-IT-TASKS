export class RuStemmer {
  static stem(word: string): string {
    word = word.toLowerCase();
    word = word.replace(/ё/g, "е");
    const m = word.match(/^(.*?[аеиоуыэюя])(.*)$/);

    if (!m) return word;

    let rv = m[2];
    let head = m[1];
    let r2 = "";

    const m2 = rv.match(/^(.*?[аеиоуыэюя])(.*)$/);
    if (m2) r2 = m2[2];

    // Шаг 1: Найти PERFECTIVE GERUND
    const perfectiveGerund = /(?:[ая]в(?:ши|шись)|(?:и|ы)в(?:ши|шись|ши))$/;
    if (perfectiveGerund.test(rv)) {
      rv = rv.replace(perfectiveGerund, "");
    } else {
      // Иначе REFLEXIVE
      rv = rv.replace(/(?:ся|сь)$/, "");

      // И ADJECTIVE / PARTICIPLE
      const adjective =
        /(?:ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ому|ему|ых|их|ую|юю|ая|яя|ою|ею)$/;
      const participle =
        /(?:(?:ивш|ывш|ующ)|(?:(?:а|я)нн|вш|ющ|щ))(?:ая|яя|ое|ее|ые|ие|ый|ий|ой|ей|ом|ем|ым|им|ому|ему|ую|юю|ого|его|ых|их|ыми|ими|ою|ею)$/;

      if (adjective.test(rv)) {
        rv = rv.replace(adjective, "");
        rv = rv.replace(participle, "");
      } else {
        // Иначе VERB
        const verb =
          /(?:(?:ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю)|(?:(?:а|я)(?:ла|на|ете|йте|ли|й|л|ем|н|ло|но|т|ет|ют|ны|ть|ешь|нно)))$/;
        if (verb.test(rv)) {
          rv = rv.replace(verb, "");
        } else {
          // Иначе NOUN
          const noun =
            /(?:а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/;
          rv = rv.replace(noun, "");
        }
      }
    }

    // Шаг 2: И
    rv = rv.replace(/и$/, "");

    // Шаг 3: DERIVATIONAL
    const derivational = /(?:ост|ость)$/;
    if (r2 && derivational.test(r2)) {
      rv = rv.replace(derivational, "");
    }

    // Шаг 4: SUPERLATIVE (ейше/ейш) — часто опускается в простых версиях, но NN сохраняем
    rv = rv.replace(/(?:ейше|ейш)$/, "");
    rv = rv.replace(/нн$/, "н");
    rv = rv.replace(/ь$/, "");

    return head + rv;
  }
}
