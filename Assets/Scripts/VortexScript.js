#pragma strict

var vortexParticleSystem : ParticleSystem;
var isActive : boolean;
var vortexScale : float = 3.0;


function Start () {
	isActive = true;
	
}

function Update () {
	if (!vortexParticleSystem.IsAlive()) {
		Destroy(this.gameObject);
	}
	if (isActive) {
		vortexParticleSystem.loop = false;
	}
	else {
		vortexParticleSystem.loop = true;
	}

	transform.localScale = Vector3(vortexScale, 0.5, vortexScale);
	transform.Rotate(Vector3.up * Time.deltaTime * 200);
	//var hits : RaycastHit[];
	
	/*
	// This was a overly sophisticated solution when a simple collider on the vortex would easily solve the problem. 
	hits = Physics.SphereCastAll ( transform.position, 2.0, transform.forward);

    // Change the material of all hit colliders
    // to use a transparent Shader
    for (var i = 0 ; i < hits.Length ; i++) {
        var hit : RaycastHit = hits[i];
        if (hit.collider.tag == "Monster") {
        	print("Vortex found monster");
        	var monster : Transform = hit.collider.transform;
        		if (monster.GetComponent(EnemyLocomotion).canMove == true) {
        			monster.GetComponent(EnemyLocomotion).canMove = false;
        		}
        	monster.transform.position = Vector3.Lerp(monster.transform.position, transform.position, Time.deltaTime * 0.5);
        	var dist : float = Vector3.Distance(monster.transform.position, transform.position);
        	if (dist <= 0.3) {
        		hit.collider.SendMessage("DieExclaimationPointExclaimationPoint");
        	}
        	
         	//send message to enemylocomotion to overide vortex motion
        }
    }
    */
}

function OnDestroy () {
	var radius : float = 2.5;
	var objectsInRange : Collider[] = Physics.OverlapSphere(transform.position, radius);
	for (var object : Collider in objectsInRange) {
	    if (object.tag == "Monster") {
	    	object.GetComponent(EnemyLocomotion).canMove = true;
	    }
	}
/*	var hits : RaycastHit[];
	hits = Physics.SphereCastAll ( transform.position, 2.0, transform.forward);
	for (var i = 0 ; i < hits.Length ; i++) {
       	var hit : RaycastHit = hits[i];
    	if (hit.collider.tag == "Monster") {
        	var monster : Transform = hit.collider.transform;
    	   	if (monster.GetComponent(EnemyLocomotion).canMove == false) {
        		monster.GetComponent(EnemyLocomotion).canMove = true;
        	}
        }
    }
*/
}

function OnTriggerEnter (other : Collider) {
	if (other.tag == "Monster") {
		other.GetComponent(EnemyLocomotion).canMove = false;
	}
}

function OnTriggerStay (other : Collider) {
	if (other.tag == "Monster") {
		other.transform.position = Vector3.Lerp(other.transform.position, transform.position, Time.deltaTime * 0.5);
        var dist : float = Vector3.Distance(other.transform.position, transform.position);
       	if (dist <= 0.3) {
       		other.SendMessage("DieExclaimationPointExclaimationPoint");
       	}
	}
}

function OnTriggerExit (other : Collider) {
	if (other.tag == "Monster") {
		other.GetComponent(EnemyLocomotion).canMove = true;
	}
}