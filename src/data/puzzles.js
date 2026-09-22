export const PUZZLES = [
  {
    id: 'puzzle-1',
    sealIndex: 0,
    title: 'The Wax-Sealed Epistle',
    itemType: 'letter',
    prerequisites: [],
    acceptedAnswers: ['ATLAS'],
    placement: {
      left: '46%',
      top: '56%',
      width: '7.5%',
      zIndex: 10,
      sealedSrc: '/assets/prop_letter_sealed.png',
      solvedSrc: '/assets/prop_letter_open.png',
      label: 'Sealed Letter'
    },
    clue: {
      date: 'Summer, 1962',
      prompt: "Arthur warned his sister that the mail carrier had prying eyes. Decrypt the postscript using his three-step shift.",
      cipherText: 'WKLV LV ZKHUH LW DOO EHJDQ: DWODV',
      shift: 3,
    },
    hints: [
      "Look at the closing word in the postscript: 'DWODV'.",
      "Arthur shifted each letter three steps forward in the alphabet. Try shifting backwards by 3.",
      "D - 3 = A, W - 3 = T, O - 3 = L, D - 3 = A, V - 3 = S. The keyword is ATLAS."
    ],
    reward: {
      id: 'curio_magnifier',
      name: "Arthur's Pocket Magnifier",
      desc: "A solid brass pocket loupe Arthur used to examine miniature gear teeth and map coordinates.",
      icon: '/assets/curio_magnifier.png'
    }
  },
  {
    id: 'puzzle-2',
    sealIndex: 1,
    title: 'The Study Photograph',
    itemType: 'photo',
    prerequisites: ['puzzle-1'],
    acceptedAnswers: ['LUMEN', 'LUMEN-1944'],
    placement: {
      left: '59%',
      top: '52%',
      width: '6.5%',
      zIndex: 10,
      sealedSrc: '/assets/prop_photo.png',
      solvedSrc: '/assets/prop_photo.png',
      label: 'Study Photograph'
    },
    clue: {
      date: 'Winter, 1944',
      prompt: "Examine Arthur's study desk closely. He cataloged his favorite reading volume during the week of the great winter blackout.",
      targetText: 'LUMEN-1944',
    },
    hints: [
      "Use the magnifying loupe to inspect the book spines behind the pendulum clock.",
      "Look for the blue-bound book tucked into the shadow of the clock.",
      "The blue spine has embossed text: 'LUMEN-1944'. Type LUMEN to break the seal."
    ],
    reward: {
      id: 'curio_photo_scrap',
      name: "Sepia Snapshot of Arthur & Sister",
      desc: "A curled photograph of two smiling children holding a handmade wooden telescope.",
      icon: '/assets/curio_photo_scrap.png'
    }
  },
  {
    id: 'puzzle-3',
    sealIndex: 2,
    title: 'The Telegraph Key',
    itemType: 'telegraph',
    prerequisites: ['puzzle-1'],
    acceptedAnswers: ['SECRET'],
    placement: {
      left: '17%',
      top: '60%',
      width: '7.5%',
      zIndex: 10,
      sealedSrc: '/assets/prop_telegraph_off.png',
      solvedSrc: '/assets/prop_telegraph_lit.png',
      label: 'Telegraph Key'
    },
    clue: {
      date: 'Autumn, 1951',
      prompt: "Listen to the maritime telegraph transmission Arthur wired to the garden shed. Decipher the dots and dashes.",
      morseSequence: '... . -.-. .-. . -',
      morseLetters: ['...', '.', '-.-.', '.-.', '.', '-'],
    },
    hints: [
      "Click the 'Play Transmission' button and watch the vacuum tube bulb flash.",
      "Open the Morse Code Chart to match the dots (.) and dashes (-). The first letter is S (...).",
      "... (S) . (E) -.-. (C) .-. (R) . (E) - (T). The word is SECRET."
    ],
    reward: {
      id: 'curio_brass_key',
      name: "Miniature Brass Telegraph Key",
      desc: "A tiny working telegraph key charm that still clicks with a clean spring action.",
      icon: '/assets/curio_brass_key.png'
    }
  },
  {
    id: 'puzzle-4',
    sealIndex: 3,
    title: 'The Marginalia Journal',
    itemType: 'journal',
    prerequisites: ['puzzle-2', 'puzzle-3'],
    acceptedAnswers: ['CHRONOS'],
    placement: {
      left: '25%',
      top: '62%',
      width: '7.5%',
      zIndex: 10,
      sealedSrc: '/assets/prop_journal.png',
      solvedSrc: '/assets/prop_journal_open.png',
      label: 'Leather Journal'
    },
    clue: {
      date: 'Spring, 1955',
      prompt: "Arthur wrote that his deepest truths were woven between the very fibers of the digital page. Look beneath the surface.",
      hiddenComment: 'ARCHIVIST NOTE: The fiber keyword is CHRONOS',
    },
    hints: [
      "Arthur is talking about the web page itself. Try right-clicking to 'Inspect Element' or use the 'Peel Back Parchment' button.",
      "Look for an HTML code comment hidden inside the document source.",
      "The comment says: '<!-- ARCHIVIST NOTE: The fiber keyword is CHRONOS -->'. The answer is CHRONOS."
    ],
    reward: {
      id: 'curio_pressed_fern',
      name: "Pressed Fern Bookmark",
      desc: "A delicate dried fern leaf picked from the woods behind the old observatory.",
      icon: '/assets/curio_pressed_fern.png'
    }
  },
  {
    id: 'puzzle-5',
    sealIndex: 4,
    title: 'The Clockwork Safe',
    itemType: 'safe',
    prerequisites: ['puzzle-4'],
    acceptedAnswers: ['3437'],
    placement: {
      left: '73%',
      top: '60%',
      width: '9%',
      zIndex: 10,
      sealedSrc: '/assets/prop_safe_closed.png',
      solvedSrc: '/assets/prop_safe_open.png',
      label: 'Clockwork Safe'
    },
    clue: {
      date: 'Winter, 1965',
      prompt: "The brass lockbox responds only to those who remember the archive journey. Deduce the four digits to release the tumblers.",
      dialRiddles: [
        "I: The Caesar shift from Arthur's letter",
        "II: The final digit of the candlelit blackout year",
        "III: Number of dots in the telegraph's first letter",
        "IV: Number of letters in the secret fiber word"
      ]
    },
    hints: [
      "Each dial corresponds to one of the previous puzzles: Letter shift, Photo year, Morse dots, and Fiber word length.",
      "Letter shift was 3. Year was 1944 (last digit 4). First Morse letter 'S' has 3 dots (...). CHRONOS has 7 letters.",
      "Set the four brass dials to: 3 - 4 - 3 - 7 and pull the lever."
    ],
    reward: {
      id: 'curio_clock_gear',
      name: "Interlocking Clockwork Brass Gear",
      desc: "An ornate 12-tooth horology gear stamped with Arthur's curator initials: 'A.P.'",
      icon: '/assets/curio_clock_gear.png'
    }
  },
  {
    id: 'puzzle-6',
    sealIndex: 5,
    title: 'The Torn Postcard',
    itemType: 'postcard',
    prerequisites: ['puzzle-2'],
    acceptedAnswers: ['STARLIGHT'],
    placement: {
      left: '34%',
      top: '54%',
      width: '6.5%',
      zIndex: 10,
      sealedSrc: '/assets/prop_postcard_torn.png',
      solvedSrc: '/assets/prop_postcard_fixed.png',
      label: 'Torn Postcard'
    },
    clue: {
      date: 'Summer, 1958',
      prompt: "A summer storm scattered Arthur's favorite constellation postcard into three scraps. Assemble the fragments and read the stamp.",
      payloadText: 'STARLIGHT',
    },
    hints: [
      "Drag the three torn postcard scraps so their edges meet on the work mat.",
      "Once assembled, scan the corner stamp with your phone camera or click 'Examine Stamp' to reveal the destination.",
      "The stamp reveals the constellation destination word: STARLIGHT."
    ],
    reward: {
      id: 'curio_star_postcard',
      name: "Restored Constellation Postcard",
      desc: "A hand-illustrated chart of the northern skies pointing directly to the treehouse coordinates.",
      icon: '/assets/curio_star_postcard.png'
    }
  }
];