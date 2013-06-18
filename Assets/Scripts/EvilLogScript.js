#pragma strict

@script RequireComponent( EnemyLocomotion )
var enemyLevel = 1;
var evilLogsSpeed = 3.0;
var health = 2;
var maxHealth = 2;
var testDeath : boolean = false;
public var flamePrefab : ParticleEmitter;
private var flame : ParticleEmitter;

function Start () {
	var setLocomotion = GetComponent(EnemyLocomotion);
	setLocomotion.monsterSpeed = evilLogsSpeed;
	health = maxHealth;
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
	
	//stop flame particle emmitter if active. clean up onDestroy
	if (flame) {
		if (flame.enabled == true) {
			flame.enabled = false;
		}
	}
	//finally, remove the game object
	Destroy (this.gameObject);
}

function Damage ( damage : int ) {
	health = health - damage;
	if (health <= 0) {
		DieExclaimationPointExclaimationPoint();
	}
	//give visual indicator that unit is damaged
	if (health < maxHealth && health > 0) {
		renderer.material.color = Color.red;
		flame = Instantiate (flamePrefab, transform.position, transform.rotation);
		flame.Simulate(0.25);
		flame.transform.parent = this.transform;
	}
}

function OnDestroy () {
	//take care of particle emmiter. if there is lag, consider reusing particle emmiters rather than create/destroy per enemy
/*
		if (flame.GetComponent(ParticleSystem).IsAlive) {
		DestroyImmediate(flame);
	}
*/
	//when changing material at runtime, a new resource is cloned. Properly dispose of it at destruction
	 DestroyImmediate(renderer.material);
}