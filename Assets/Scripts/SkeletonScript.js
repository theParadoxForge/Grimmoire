#pragma strict

@script RequireComponent( EnemyLocomotion )
var enemyLevel = 1;
var skeletonsSpeed = 3.0;
var health = 1;
var testDeath : boolean = false;


function Start () {
	var setLocomotion = GetComponent(EnemyLocomotion);
	setLocomotion.monsterSpeed = skeletonsSpeed;
}

function Update () {
	if (testDeath || health <= 0) {
		DieExclaimationPointExclaimationPoint();
	}

}
//handles events related to this creature type's death
function DieExclaimationPointExclaimationPoint () {
	//any death animation begins here
	
	//any on death events trigger here. note that for some creatures, we may choose to remove the model first, implement residual effects, then destroy the object
	
	
	//finally, remove the game object
	Destroy (this.gameObject);
}

function Damage ( damage : int ) {
	health = health - damage;
	if (health <= 0) {
		DieExclaimationPointExclaimationPoint();
	}
}
/*
//TEMPORARY QUICK AND DIRTY MOUSE CONTROL. we ideally want to create a weapon effect that damages units.
function OnMouseDown () {
	--health;
//	DieExclaimationPointExclaimationPoint();
}
*/