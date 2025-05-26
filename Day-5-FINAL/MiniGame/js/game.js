setGame("1200x600");
game.folder = "assets";

//file gambar yang dipakai dalam game
var gambar = {
	idle:"idle.png",
	run:"run.png",
	jump:"jump.png",
	fall:"Fall.png",
	hit:"hit.png",
	tileset:"terrain.png",
	bg:"bg.png",
	item1:"injection.png",
	item2:"Obat.png",
	item3:"Bandage.png",
	item4:"Pill.png",
	item5:"Sanit.png",
	item6:"Mask.png",
	item7:"Box.png",
	musuh_idle_run:"runs.png",
	musuh_hit:"hits.png",
}
//file suara yang dipakai dalam game
var suara = {
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

var attempts = 0; // Track the number of attempts

function updateDeathCounter() {
	document.getElementById('deathCounter').innerText = `Attempts: ${attempts}/3`;
}

function updateObjectiveCounter() {
	document.getElementById('objectiveCounter').innerText = `Objective: ${game.score}/45`;
}

function startScreen(){	
	setAwal();
		jalankan(gameLoop);
}



function setAwal(){
	game.hero=setSprite(dataGambar.idle,32,32);
	game.skalaSprite=2;
	game.hero.animDiam = dataGambar.idle;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJalan = dataGambar.run;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	setPlatform(map_1, dataGambar.tileset,32,game.hero);
	game.gameOver=ulangiPermainan;	
	setPlatformItem(1,dataGambar.item1);
	setPlatformItem(2,dataGambar.item2);
	setPlatformItem(3,dataGambar.item3);
	setPlatformItem(4,dataGambar.item4);
	setPlatformItem(5,dataGambar.item5);
	setPlatformItem(6,dataGambar.item6);
	setPlatformItem(7,dataGambar.item7);
	var musuh=[];
	musuh.animDiam = dataGambar.musuh_idle_run;
	musuh.animJalan = dataGambar.musuh_idle_run;
	musuh.animMati = dataGambar.musuh_hit;
	setPlatformEnemy(1,musuh);

}
function ulangiPermainan(){
	game.score = 0;
	game.aktif = true;
	attempts++;
	updateDeathCounter(); // Update the death counter display
	updateObjectiveCounter(); // Update the objective counter display
	
		setAwal();
		jalankan(gameLoop);
	
}

function gameLoop(){
	hapusLayar();	
	if(game.kanan){
		gerakLevel(game.hero,3,0);

	}else if(game.kiri){
		gerakLevel(game.hero,-3,0);
	}if(game.atas){
		gerakLevel(game.hero,0,-10);
	}
	latar(dataGambar.bg,0,0);
	buatLevel();
	cekItem();
	teks(game.score,40,60);

}
function cekItem(){
	if (game.itemID > 0){
		if (game.itemID === 1) {
			window.location.href = "../Talk/index.html"; // Redirect to game over page
		} else if (game.itemID === 2) {
			window.location.href = "../Damages/index.html"; // Redirect to win page
		} else {
			tambahScore(1);
			updateObjectiveCounter(); // Update the objective counter display
			console.log(`Current Score: ${game.score}`); // Log current score
			
		}
		game.itemID = 0;
	}
}