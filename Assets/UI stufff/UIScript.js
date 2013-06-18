#pragma strict


var baseGUILayer : Texture2D;
var buttonBaseLayer : Texture2D;
var explosiveButtonBase : Texture2D;
var goldVortexButtonBase : Texture2D;
var ironWallButtonBase : Texture2D;
var magnesiumBulletButtonBase : Texture2D;
var purificationBeamButtonBase : Texture2D;
var saveSigilButtonBase : Texture2D;
var lvl1Bar : Texture2D;
var lvl2Bar : Texture2D;
var lvl3Bar : Texture2D;
var lvl4Bar : Texture2D;
var lvl5Bar : Texture2D;
var notLearnedYet : Texture2D;
var readyToLvl : Texture2D;
var scoreBanner : Texture2D;
var uiSigilIcon : Texture2D;
var uiSigilIconUsed : Texture2D;

var magnesiumBullet : GUIElement;
var sigil1 : GUITexture;
var sigil2 : GUITexture;
var sigil3 : GUITexture;
var sigil4 : GUITexture;

function Start () {
	sigil4.texture = uiSigilIconUsed;
}

function Update () {

}

function OnMouseDown () {

	WaitForSeconds(5);
	sigil3.texture = uiSigilIconUsed;

}