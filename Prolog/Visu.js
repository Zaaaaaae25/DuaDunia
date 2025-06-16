const transitionTextContainer = document.createElement("div");
transitionTextContainer.id = "transition-text";
transitionTextContainer.style.position = "fixed";
transitionTextContainer.style.top = "50%";
transitionTextContainer.style.left = "50%";
transitionTextContainer.style.transform = "translate(-50%, -50%)";
transitionTextContainer.style.color = "white";
transitionTextContainer.style.fontSize = "24px";
transitionTextContainer.style.textAlign = "center";
transitionTextContainer.style.opacity = "0";
transitionTextContainer.style.transition = "opacity 0.5s ease-in-out";
document.body.appendChild(transitionTextContainer);

const dialogText = document.getElementById("dialog-text");
const nextText = document.getElementById("next-text");
const characterLeft = document.getElementById("character-left");
const characterRight = document.getElementById("character-right");
const background = document.getElementById("background");
const transitionOverlay = document.getElementById("transition-overlay");
const characterName = document.getElementById("character-name");
const blackScreen = document.getElementById("black-screen");
const skipButton = document.getElementById("skip-button");

let dialogIndex = 0;
let typingSpeed = 50;
let isTyping = false;
let typingTimeout;
let currentBackground = "asset/bg1.png";

const dialogData = [
  {
    text: "Di sebuah rumah sederhana di pinggiran kota, hiduplah seorang gadis bernama Aisyah. Sejak kecil, ia selalu mendengar suara lembut ibunya dan tatapan penuh kasih dari ayahnya. Mereka bukan keluarga kaya, tetapi rumah mereka selalu dipenuhi kehangatan dan cinta.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg1.png",
    moveBg: true,
    transitionText: "Aisyah...",
    minigameURL: "",
  },

  {
    text: "Namun, kebahagiaan itu perlahan memudar saat kedua orang tua Aisyah jatuh sakit. Penyakit kronis merenggut tenaga mereka, membuat hari-hari di rumah diwarnai keheningan yang menyakitkan. Aisyah yang masih kecil, bersama kedua adiknya, hanya bisa menatap penuh harap, berharap keajaiban datang.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg2.png",
    moveBg: true,
    transitionText: "Tidak Selamanya...",
    minigameURL: "",
  },
  {
    text: "Suatu hari, sebelum mereka pergi untuk selama-lamanya, ayah dan ibunya memanggil Aisyah ke sisi mereka.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg2.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Aisyah, Nak Kami mungkin tidak bisa menemanimu lebih lama… tapi percakapan satu hal, kamu adalah anak yang kuat",
    speaker: "left",
    name: "Ibu Aisyah",
    expression: "Nothing",
    background: "../asset/BackGroun/bg2.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Jaga adik-adikmu. Dunia ini tidak selalu baik, tapi kamu bisa menjadi seseorang yang membawa kebaikan di dalamnya. Jangan pernah membalas keburukan dengan keburukan. Dan yang paling penting… jangan biarkan mereka merasa sendirian.",
    speaker: "left",
    name: "Ayah Aisyah",
    expression: "Nothing",
    background: "../asset/BackGroun/bg2.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Dengan air mata yang tertahan, Aisyah mengangguk. Dia tidak sepenuhnya mengerti beban yang akan dia tanggung, tetapi satu hal yang pasti—dia berjanji untuk selalu menjaga keluarganya.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg2.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Setelah kepergian kedua orang tuanya, Aisyah dan adik-adiknya tinggal bersama nenek mereka. Kehidupan mereka tidak berlimpah, tetapi cukup. Sang nenek bekerja keras mengelola toko sembako kecil yang menjadi sumber penghidupan mereka.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg3.png",
    moveBg: true,
    transitionText: "Harapan...",
    minigameURL: "",
  },
  {
    text: "Aisyah, meskipun masih muda, memahami kesulitan yang mereka hadapi. Maka, setiap kali ada waktu luang sepulang sekolah, ia membantu neneknya menjaga toko. Ia melayani pelanggan dengan senyuman, menyapu lantai toko, dan memastikan barang tetap rapi di rak.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg3.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Dalam hatinya, Aisyah tahu, ini adalah balasan kasih sayang neneknya—dengan menjadi anak yang kuat, baik, dan penuh tanggung jawab, seperti yang diinginkan ayah dan ibunya.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg3.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Alex selalu menjadi anak yang berbeda. Sejak kecil, angka dan rumus seolah menarik pikiran dengan mudah. Saat anak-anak seusianya masih belajar membaca, Alex sudah menamakan buku matematika tingkat lanjut. Kepintarannya bukanlah anugerah yang bisa ia nikmati, melainkan beban yang harus ia pikul.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg4.png",
    moveBg: true,
    transitionText: "Alex...",
    minigameURL: "",
  },
  {
    text: "Orang tuanya, dua sosok yang begitu bangga akan kejeniusannya, terus mendorongnya untuk melompat lebih jauh. “Kamu bukan anak biasa, Alex. Kamu harus terus maju.” Itu yang selalu mereka katakan. Dengan jadwal belajar yang ketat, privasi yang tiada henti, dan ekspektasi yang menyesakkan, Alex tidak pernah memiliki waktu untuk sekedar menjadi anak-anak.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg5.png",
    moveBg: true,
    transitionText: "Tekanan...",
    minigameURL: "",
  },
  {
    text: "Hingga akhirnya, di usia 12 tahun, ia sudah duduk di bangku SMA.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg6.png",
    moveBg: true,
    transitionText: "Terkucilkan...",
    minigameURL: "",
  },
  {
    text: "Namun, kejeniusan itu tidak membawa kebahagiaan. Sebaliknya, ia merasa lebih terasing dari siapa pun. Teman-teman sekelasnya bukan anak-anak sebayanya—mereka remaja yang membicarakan hal-hal yang tidak ia pahami. Mereka tidak membully Alex secara langsung, namun ia tetap merasa berada di luar lingkaran. Ia hanya bocah di antara orang-orang yang lebih besar, lebih dewasa, dan lebih bebas.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg6.png",
    moveBg: true,
    transitionText: "Tekanan...",
    minigameURL: "",
  },
  {
    text: "Di saat ia mulai kehilangan harapan untuk menemukan tempatnya, Vania datang.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg7.png",
    moveBg: true,
    transitionText: "Teman?...",
    minigameURL: "",
  },
  {
    text: "Gadis itu tidak memandangnya sebagai anak ajaib atau bocah jenius. Vania tidak peduli dengan nilai-nilainya atau seberapa cepat ia menyelesaikan soal matematika yang rumit. Yang ia lihat hanyalah seorang anak yang sendirian, dan entah bagaimana caranya, Vania tidak suka melihat orang lain terasing seperti itu.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg7.png",
    moveBg: true,
    transitionText: "Tekanan...",
    minigameURL: "",
  },
  {
    text: "Hei, bocah pintar! Kamu kelihatannya bosan. Mau lihat sesuatu yang menarik?",
    speaker: "left",
    name: "Vania",
    expression: "Nothing",
    background: "../asset/BackGroun/bg7.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Vania tidak menunggu jawaban. Dengan penuh percaya diri, ia menarik Alex ke dalam dunianya—dunia yang penuh kegilaan, kebebasan, dan hal-hal yang selama ini tidak pernah bisa ia lakukan. Untuk pertama kalinya, Alex menemukan tempat di mana ia tidak harus selalu pintar.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg8.png",
    moveBg: true,
    transitionText: "Tentu...",
    minigameURL: "",
  },
  {
    text: "Ia bisa tertawa, bisa berbuat nakal, dan bisa merasa… hidup.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg8.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Mengikuti Vania memberinya sesuatu yang selama ini hilang dalam hidupnya: kesenangan. Setiap kenakalan, setiap masalah yang mereka buat di sekolah, adalah caranya melampiaskan kemarahan yang selama ini ia pendam. Ia tidak ingin menjadi anak baik yang patuh. Ia ingin bebas, seperti Vania.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg9.png",
    moveBg: true,
    transitionText: "Kebebasan...",
    minigameURL: "",
  },
  {
    text: "Dan tanpa sadar, ia mulai menutup mata terhadap apa yang benar dan salah.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg9.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Rizki selalu dikenal sebagai sosok yang hangat dan menyenangkan. Dengan senyum ramah dan sikap gentle-nya, ia menjadi sosok yang mudah disukai, terutama di kalangan para gadis. Bukan hanya karena wajahnya yang menarik, tetapi karena caranya memperlakukan orang lain dengan hormat dan perhatian.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg10.png",
    moveBg: true,
    transitionText: "Rizki...",
    minigameURL: "",
  },
  {
    text: "Berbeda dengan kebanyakan teman sebayanya, Rizki tumbuh dalam keluarga yang harmonis. Orang tuanya selalu mendengarkan, memberi dukungan, dan membebaskannya untuk memilih jalannya sendiri. Ia tidak pernah merasakan tekanan berlebihan atau tuntutan yang memberatkan. Rumahnya selalu penuh canda tawa, membuatnya tumbuh menjadi seseorang yang hangat dan mudah bergaul.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg11.png",
    moveBg: true,
    transitionText: "Kehangatan...",
    minigameURL: "",
  },
  {
    text: "Namun, di balik semua itu, ada satu hal yang tidak pernah ia ungkapkan—rasa sukanya pada Vania.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg12.png",
    moveBg: true,
    transitionText: "Rasa...",
    minigameURL: "",
  },
  {
    text: "Vania bukan seperti gadis-gadis lain yang tertarik padanya. Ia berbeda. Berbeda dengan semua wanita yang selama ini mendekatinya, yang selalu tersenyum manis dan berbicara dengan lembut. Vania adalah badai—liar, tidak terduga, dan selalu menantang. Ia tidak peduli dengan pendapat orang lain, selalu melakukan hal sesukanya tanpa rasa takut.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg12.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Dan entah kenapa, justru itulah yang membuat Rizki semakin terpikat.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg13.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Ia tahu bahwa Vania bukan anak yang mudah didekati, dan ia juga sadar bahwa gadis itu bukan tipe yang akan jatuh hati pada seseorang seperti dirinya. Oleh karena itu, ia tidak pernah berani mengungkapkan perasaannya. Bukan karena takut ditolak, tapi karena takut kehilangan tempatnya di sisi Vania.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg14.png",
    moveBg: true,
    transitionText: "Dekat...",
    minigameURL: "",
  },
  {
    text: "Jadi, dia memilih cara lain—mengikutinya.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg14.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Setiap kenakalan yang dibuat Vania, Rizki selalu ada di persahabatan. Bukan karena ia benar-benar menikmati membuat masalah, tetapi karena ia ingin tetap berada di sisinya. Ia ingin dipandang oleh Vania, meskipun bukan sebagai seseorang yang disukai, setidaknya sebagai seseorang yang selalu ada.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg14.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Namun, dalam prosesnya, ia mulai kehilangan batas. Ia mulai menutup mata terhadap hal-hal yang dulu ia anggap salah. Jika itu bisa membuatnya tetap bersama Vania, maka tidak masalah.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg14.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Setidaknya, itu yang dia yakini.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg14.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Vania bukanlah anak yang terlahir nakal. Dulu, ia adalah gadis kecil yang ceria, penuh semangat, dan selalu berusaha membuat orang tua bangga. Namun, seiring berjalannya waktu, ia mulai menyadari satu hal yang menyakitkan—tidak peduli seberapa keras ia berusaha, orang tuanya selalu sibuk dengan pekerjaan.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg15.png",
    moveBg: true,
    transitionText: "Vania...",
    minigameURL: "",
  },
  {
    text: "Mereka memberikan segalanya—rumah mewah, pakaian mahal, gadget terbaru, dan uang yang tidak pernah habis. Tapi tidak ada yang bisa menggantikan sesuatu yang paling ia inginkan: perhatian.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg15.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Di rumah yang besar dan megah itu, Vania hanya seorang diri. Sarapan pagi sering ia habiskan sendirian, makan malam selalu terasa hampa tanpa kehangatan keluarga. Orang tua lebih banyak berbicara dengan rekan bisnis daripada dengan dia. Saat ia ingin bercerita tentang kisahnya di sekolah, mereka hanya mengangguk tanpa benar-benar mendengarkan.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg16.png",
    moveBg: true,
    transitionText: "Perhatian?...",
    minigameURL: "",
  },
  {
    text: "Dan perlahan, Vania berhenti mencoba.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg16.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Jika penampilan baik dan berprestasi tidak bisa membuat mereka menoleh kepadanya, maka mungkin… menjadi nakal bisa.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg17.png",
    moveBg: true,
    transitionText: "Penyangkalan...",
    minigameURL: "",
  },
  {
    text: "Ia mulai melawan aturan, membuat paksaan, membolos kelas, dan terlibat dalam berbagai masalah di sekolah. Ia tahu semua itu salah, tapi setidaknya, itu memberikan sesuatu—reaksi. Bahkan jika itu marah, setidaknya itu berarti mereka melihatnya, meski hanya sesaat.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg17.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Namun, semakin lama, kenakalan itu bukan lagi sekadar cara mencari perhatian. Ia mulai menikmatinya. Setidaknya, dalam kekacauan yang ia buat, ia merasa bisa hidup. Setidaknya, dalam sorakan teman-temannya, ia merasa ada yang memperkirakan penting.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg18.png",
    moveBg: true,
    transitionText: "Perhatian...",
    minigameURL: "",
  },
  {
    text: "Hingga akhirnya, ia bertemu Alex—anak jenius yang tampak sama tersesatnya seperti dirinya. Ia juga menemukan Rizki—seseorang yang selalu ada di sisinya, tanpa pernah ia minta. Bersama mereka, Vania merasa punya tempat. Tempat di mana ia tidak perlu berusaha menjadi anak baik yang tidak pernah diperhatikan.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg19.png",
    moveBg: true,
    transitionText: "Pertemuan...",
    minigameURL: "",
  },
  {
    text: "Karena di dunia yang ia ciptakan sendiri, ia bisa menjadi siapa pun yang ia mau.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg19.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Segala sesuatu berawal dari sesuatu yang sederhana—perhatian.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg20.png",
    moveBg: true,
    transitionText: "Awal Dari Segalanya...",
    minigameURL: "",
  },
  {
    text: "Selama ini, Vania adalah pusat dari segala kegaduhan di sekolah. Ia mungkin tidak dikenal karena prestasinya, tetapi semua orang tahu namanya. Guru-guru sering kali berkata dalam rapat, entah karena kenakalannya atau masalah yang ia buat. Teman-teman selalu melihatnya sebagai sosok yang berani, seseorang yang tidak peduli dengan aturan dan selalu memilih sesuka hati.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg20.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Namun semuanya mulai berubah sejak Aisyah datang.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg21.png",
    moveBg: true,
    transitionText: "Berubah...",
    minigameURL: "",
  },
  {
    text: "Aisyah bukan sekedar anak pintar. Ia adalah murid guru kesayangan, seseorang yang selalu dipuji karena sikapnya yang baik dan kecerdasannya yang luar biasa. Setiap kali ada perlombaan atau prestasi akademik, namanya selalu disebut. Setiap kali ada anak yang membutuhkan bantuan, Aisyah selalu siap membantu.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg21.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Dan perlahan, perhatian yang dulu ada pada Vania mulai beralih ke gadis itu.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg22.png",
    moveBg: true,
    transitionText: "Perhatian Lagi?...",
    minigameURL: "",
  },
  {
    text: 'Awalnya, Vania hanya merasa kesal. Namun, semakin hari, dia mulai merasa terasing. Seakan-akan semua orang mulai membandingkannya dengan Aisyah. "Lihat Aisyah, dia pintar dan sopan. Kenapa kamu tidak bisa seperti dia?" kata-kata itu terus-menerus ia dengar, baik dari guru-guru, teman-teman, bahkan keluarganya sendiri.',
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg22.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Seakan-akan, Aisyah adalah gambaran sempurna dari semua hal yang tidak bisa ia capai.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg22.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Iri. Dengki. Amarah.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg23.png",
    moveBg: true,
    transitionText: "Amarah...",
    minigameURL: "",
  },
  {
    text: "Semua itu perlahan tumbuh di dalam dirinya. Dan semakin dia mendengar namanya dibandingkan dengan gadis Aisyah, semakin dia ingin menghancurkannya.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg23.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Bagi Vania, Aisyah bukan sekadar murid pintar. Aisyah adalah penghalang, seseorang yang tanpa sadar telah merebut satu-satunya hal yang selama ini ia miliki—perhatian.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg23.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "Dan jika dunia lebih memilih Aisyah gadis, maka Vania akan memastikan bahwa dia tidak akan menikmati hidangan dengan mudah.",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg23.png",
    moveBg: true,
    transitionText: "",
    minigameURL: "",
  },
  {
    text: "",
    speaker: "left",
    name: "Narator",
    expression: "Nothing",
    background: "../asset/BackGroun/bg.png",
    moveBg: true,
    transitionText: "Berlanjut...",
    minigameURL: "../Day-1-Denial/Early/index.html",
  },
];
function typeWriterEffect(text, container, callback, index = 0) {
  if (index === 0) {
    container.textContent = "";
    isTyping = true;
  }
  if (index < text.length) {
    container.textContent += text.charAt(index);
    typingTimeout = setTimeout(() => typeWriterEffect(text, container, callback, index + 1), typingSpeed);
  } else {
    isTyping = false;
    if (callback) callback();
  }
}

function updateCharacterExpression(speaker, expression) {
  if (speaker === "left") {
    characterLeft.src = `../asset/Char/char_${expression}.png`;
    characterLeft.style.opacity = "1";
    characterRight.style.opacity = "0.5";
  } else {
    characterRight.src = `../asset/Char/char_${expression}.png`;
    characterRight.style.opacity = "1";
    characterLeft.style.opacity = "0.5";
  }
}

function updateBackground(dialog, callback) {
  if (dialog.background !== currentBackground) {
    transitionOverlay.classList.add("active");
    nextText.style.pointerEvents = "none";

    // Show skip button during transition
    skipButton.style.display = "block";

    let transitionMessage = dialog.transitionText || "";
    transitionTextContainer.style.opacity = "1";

    let skipTransition = false;

    skipButton.onclick = () => {
      skipTransition = true;
      completeTransition();
    };

    function completeTransition() {
      // Hide skip button
      skipButton.style.display = "none";

      // Clear any ongoing typing
      clearTimeout(typingTimeout);

      background.src = dialog.background;
      currentBackground = dialog.background;

      background.onload = () => {
        if (dialog.moveBg) {
          moveBackgroundPingPong(dialog.text.length);
        } else {
          background.style.transition = "none";
          background.style.transform = "translateX(0px)";
        }

        transitionOverlay.classList.remove("active");
        transitionTextContainer.style.opacity = "0";
        nextText.style.pointerEvents = "auto";

        if (callback) callback();
      };
    }

    if (!skipTransition) {
      typeWriterEffect(transitionMessage, transitionTextContainer, () => {
        setTimeout(completeTransition, 1000);
      });
    }
  } else {
    if (callback) callback();
  }
}

function moveBackgroundPingPong(textLength) {
  if (!dialogData[dialogIndex].moveBg) return; // Pastikan moveBg true sebelum memulai animasi

  background.style.transition = "none";
  background.style.transform = `translateX(0px)`;

  setTimeout(() => {
    const bgWidth = background.naturalWidth || background.clientWidth;
    const screenWidth = window.innerWidth;

    if (bgWidth <= screenWidth) return;

    let maxMove = Math.min((bgWidth - screenWidth) * 0.1, 50);
    let moveDuration = Math.max(textLength * typingSpeed * 0.01, 4000);

    function animatePingPong(direction) {
      if (!dialogData[dialogIndex].moveBg) {
        background.style.transition = "none";
        background.style.transform = `translateX(0px)`;
        return; // Stop animasi jika moveBg diubah menjadi false
      }

      background.style.transition = `transform ${moveDuration / 1000}s linear`;
      background.style.transform = `translateX(${direction === "right" ? -maxMove : 0}px)`;

      setTimeout(() => {
        background.style.transition = `transform ${moveDuration / 1000}s linear`;
        background.style.transform = `translateX(${direction === "right" ? 0 : -maxMove}px)`;

        setTimeout(() => animatePingPong(direction === "right" ? "left" : "right"), moveDuration);
      }, moveDuration);
    }

    animatePingPong("right");
  }, 100);
}

function showDialog() {
  if (dialogIndex >= dialogData.length) {
    dialogText.textContent = "Cerita selesai!";
    nextText.style.display = "none"; // Sembunyikan tombol next di akhir cerita
    return;
  }
  let dialog = dialogData[dialogIndex];

  characterName.textContent = dialog.name || "";
  updateCharacterExpression(dialog.speaker, dialog.expression);
  updateBackground(dialog, () => {
    typeWriterEffect(dialog.text, dialogText);
  });

  if (dialog.minigameURL) {
    setTimeout(() => {
      transitionToMinigame(dialog.minigameURL);
    }, 1000);
  }
}
function transitionToMinigame(url) {
  blackScreen.style.visibility = "visible";
  blackScreen.style.opacity = "1";

  setTimeout(() => {
    window.location.href = url;
  }, 1500);
}

// ... existing code ...

// Function to fade in audio
function fadeInAudio(audio, duration) {
  // Reset volume to 0 and try to play
  audio.volume = 0;
  let playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Playback started successfully
        let step = 0.1 / (duration / 100);
        let interval = setInterval(() => {
          if (audio.volume < 0.5) {
            // Maksimum volume 0.5 (50%)
            audio.volume = Math.min(audio.volume + step, 0.5);
          } else {
            clearInterval(interval);
          }
        }, 100);
      })
      .catch((error) => {
        console.log("Playback failed:", error);
      });
  }
}

// Function to fade out audio
function fadeOutAudio(audio, duration) {
  let step = 0.1 / (duration / 100);
  let interval = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      clearInterval(interval);
      audio.pause();
    }
  }, 100);
}

// Modifikasi kode kontrol musik
const musicToggle = document.getElementById("music-toggle");
const musicIcon = musicToggle.querySelector(".music-icon");
const backgroundMusic = document.getElementById("background-music");
let isMusicPlaying = false;

function toggleMusic() {
  if (isMusicPlaying) {
    fadeOutAudio(backgroundMusic, 0);
    musicIcon.textContent = "🔈";
  } else {
    fadeInAudio(backgroundMusic, 0);
    musicIcon.textContent = "🔊";
  }
  isMusicPlaying = !isMusicPlaying;
}

musicToggle.addEventListener("click", toggleMusic);

// Pastikan musik dimuat dengan benar saat halaman dimuat
window.addEventListener("load", () => {
  backgroundMusic.volume = 0;
  backgroundMusic.pause();
  musicIcon.textContent = "🔈";

  // Preload the audio
  backgroundMusic.load();
});

// ... existing code ...

function handleNextClick() {
  if (isTyping) {
    // Jika sedang mengetik, selesaikan typing langsung
    clearTimeout(typingTimeout);
    dialogText.textContent = dialogData[dialogIndex].text;
    isTyping = false;
  } else {
    // Jika tidak sedang mengetik, lanjut ke dialog berikutnya
    dialogIndex++;
    showDialog();
  }
}

// Tambahkan event listener untuk tombol next
nextText.addEventListener("click", handleNextClick);

showDialog();
