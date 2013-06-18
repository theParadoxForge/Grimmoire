#pragma strict

public var playerHealth = 5;

function Start () {

}

function Update () {

}

function OnCollisionEnter (collision : Collision) {
	if (collision.collider.CompareTag("Monster")) {
	//	var monster = collision.collider.gameObject;
			print("monster tag found");
		//modify name to get monster type specific script
		var enemyScriptName = collision.collider.name;
		//the object should be a clone from prefab, find the "(" index and delete next 7 characters
		var idx = enemyScriptName.LastIndexOf("(");
		//remove only if clone in name is found
		if (idx > 0) {
			enemyScriptName = enemyScriptName.Remove(idx, 7);
		}
		enemyScriptName = enemyScriptName + "Script";
		//	print(enemyScriptName);
		collision.collider.GetComponent(enemyScriptName).SendMessage("DieExclaimationPointExclaimationPoint");
	}
	else {
		print("no tag found");
		print(collision.collider.tag);
	}
	

}