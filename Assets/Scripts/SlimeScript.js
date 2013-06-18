#pragma strict

@script RequireComponent( EnemyLocomotion )
var enemyLevel = 1;
var slimeMinSpeed = 1.0;
// max speed. as slime gets smaller, it speeds up to this speed in a directly proportional manner. using this there is no need to adjust slimeSpeed manually
var slimeMaxSpeed = 3.5;
var slimeSpeed = 1.0;
var health = 1;
public var slimeInitSize = 2;
var slimeSize : int;
var testDeath : boolean = false;
public var slimePrefab : GameObject;
var slimeMomentum : float;

function Start () {
	slimeMomentum = slimeInitSize *1.0 * slimeMinSpeed;
	SetSlimeSize(slimeSize);
	var setLocomotion = GetComponent(EnemyLocomotion);
	setLocomotion.monsterSpeed = slimeSpeed;
	//slimeSize = SkewedRandomRange(1, 4, 2);

		if (slimePrefab == null) {
		// would like to find a more elegant solution, as the access might get expensive. Prehaps we will pull from gameController array
		// as is this requires the slimePrefab to remain empty or else the prefab itself gets modified at runtime...
		// this solution works, but is under suspicion.
		slimePrefab = Resources.LoadAssetAtPath("Assets/Prefabs/Slime.prefab", GameObject);
	}
}

function Update () {
	if (testDeath) {
		DieExclaimationPointExclaimationPoint();
	}
}
//not working :(
function OnCollisionEnter (collision : Collision) {
	print("collision");
	if (collision.transform.name == "Slime(Clone)") {
		print("possible merge occurance");
	}

}

//handles events related to this creature type's death
function DieExclaimationPointExclaimationPoint () {
	//any death animation begins here
	
	//any on death events trigger here. note that for some creatures, we may choose to remove the model first, implement residual effects, then destroy the object
	
	if (slimeSize > 1) {
		//print(this.name);
		var aRandomVectorOffset = Random.Range(0, 3.0);
		var newSlimeRight : GameObject = Instantiate (slimePrefab, transform.position + (transform.right * 2) - (transform.forward * aRandomVectorOffset), Quaternion.identity);
		newSlimeRight.GetComponent(SlimeScript).SetSlimeSize(slimeSize - 1);
		aRandomVectorOffset = Random.Range(0, 3.0);
		var newSlimeLeft : GameObject = Instantiate (slimePrefab, transform.position - (transform.right * 2) - (transform.forward * aRandomVectorOffset), Quaternion.identity);
		newSlimeLeft.GetComponent(SlimeScript).SetSlimeSize(slimeSize - 1);
	}
	
	//finally, remove the game object
	Destroy (this.gameObject);
}

function Damage ( damage : int ) {
	health = health - damage;
	if (health <= 0) {
		DieExclaimationPointExclaimationPoint();
	}
}

function SetSlimeSize ( newSize : int ) {
	if (newSize == null) {
		slimeSize = slimeInitSize;
		slimeSpeed = slimeMinSpeed;
	}
	slimeSize = newSize;
	transform.localScale = Vector3.one * slimeSize;
	SetSlimeSpeed();
}

function SetSlimeSpeed () {
	// we will add some way to confine the max speed, or simply reverse the controlling element
	slimeSpeed = slimeMomentum / (slimeSize * 1.0);
//	print(slimeSpeed);
}

/*
//TEMPORARY QUICK AND DIRTY MOUSE CONTROL. we ideally want to create a weapon effect that damages units.
function OnMouseDown () {
	--health;
//	DieExclaimationPointExclaimationPoint();
}
*/

function SkewedRandomRange(start: int, end: int, p: float) {
/*
If you supply a value of 1 as the p parameter, you get uniform distribution. If you use 2, you get the quadratic behaviour you mentioned. 
0.5 gives you square root (ie, higher numbers are favoured). You can use any fractional value for this, so you can vary the behaviour smoothly.
*/
    var rnd = Mathf.Pow(Random.value, p);

    var index = Mathf.FloorToInt(start + rnd * (end - start + 1));

    return Mathf.Clamp(index, start, end);

}