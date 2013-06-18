#pragma strict

//this is for use of manually created spawn points
//public var spawnPoints : Transform[];
public var spawnEnabled : boolean;
var maxEnemyWaveSize = 20;
var spawnRadius = 80;
public var maxDelay = 3.0;
//An array of monster types. as set now, the group with the larger index will spawn more frequently
var monsterPrefabArray : Transform[];
var isSpawning : boolean = false;



function Start () {
	if (spawnEnabled) {
		isSpawning = true;
		InitiateSpawning();
		
	}
}

function Update () {
	if (spawnEnabled && isSpawning == false) {
		isSpawning = true;
		InitiateSpawning();
	}
	//for debugging spawn. seperated from above because above may prove useful for pausing and level changing.
	if (Input.GetKeyDown ("space")) {
		if (spawnEnabled) {
			spawnEnabled = false;
			isSpawning = false;
		}
		else {
			spawnEnabled = true;
		}
	}
	
}

function InitiateSpawning () {
	while (spawnEnabled) {
		//start infinite spawn loop in parallel with random wait interval
		yield WaitForSeconds(Random.Range(0, maxDelay));
		Spawn();
	}

}

function Spawn () {
	var numberOfMonstersOnField = GameObject.FindGameObjectsWithTag("Monster");
	if (numberOfMonstersOnField.Length < maxEnemyWaveSize) {
//		get position and rotation of random spawn point, create a skele
//		var randomSpawnPoint = spawnPoints[Random.Range(0, spawnPoints.Length)];
//		var position : Vector3 = randomSpawnPoint.position;
//		var rotation = randomSpawnPoint.rotation;

//	Alternatively we could use maths to create random virtual spawnpoints. Having both options could be useful for developement with more advanced concepts
	
		// "i" represents the progress around the circle from 0-1
	    // we multiply by 1.0 to ensure we get a fraction as a result.
 	   var i = (Random.Range(0, 360) * 1.0) / 360;

	    // get the angle for this step (in radians, not degrees)
 	   var angle = i * Mathf.PI * 2;

	    // the X & Z position for this angle are calculated using Sin & Cos
	    var x = Mathf.Sin(angle) * spawnRadius;
	    var z = Mathf.Cos(angle) * spawnRadius;
	    var position = Vector3(x, 0.0, z);
		
		//Determine which monster type to use
		var index = SkewedRandomRange(1, monsterPrefabArray.Length, .5) - 1;
		var newMonster = Instantiate (monsterPrefabArray[index], position, Quaternion.identity);
	}
}

//random code borrowed from Andeeee on Unity Forum

function SkewedRandomRange(start: int, end: int, p: float) {
/*
If you supply a value of 1 as the p parameter, you get uniform distribution. If you use 2, you get the quadratic behaviour you mentioned. 
0.5 gives you square root (ie, higher numbers are favoured). You can use any fractional value for this, so you can vary the behaviour smoothly.
*/
    var rnd = Mathf.Pow(Random.value, p);

    var index = Mathf.FloorToInt(start + rnd * (end - start + 1));

    return Mathf.Clamp(index, start, end);

}