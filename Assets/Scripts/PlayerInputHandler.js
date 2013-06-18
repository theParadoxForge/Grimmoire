#pragma strict

var mouseDownPosition : Vector3;
var mouseUpPosition : Vector3;
var newMousePosition : Vector3;
var mouseButton1Started : boolean;

var vortexParticleSystem : Transform;


function Start () {

}

function Update () {
	if ( Input.GetMouseButtonDown(0)) {
		var hit : RaycastHit;
		var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray, hit, 100.0)) {
			if (hit.collider.CompareTag("Monster")) {
				//	print("monster tag found");
				//modify name to get monster type specific script
				var enemyScriptName = hit.collider.name;
				//the object should be a clone from prefab, find the "(" index and delete next 7 characters
				var idx = enemyScriptName.LastIndexOf("(");
				//remove only if clone in name is found
				if (idx > 0) {
					enemyScriptName = enemyScriptName.Remove(idx, 7);
				}
				enemyScriptName = enemyScriptName + "Script";
				//	print(enemyScriptName);
				
				hit.collider.GetComponent(enemyScriptName).SendMessage("Damage" , 1);
			}
		}
	}

	if (Input.GetMouseButtonDown(1) && mouseButton1Started == false) {
		ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray, hit, 100.0)) {
			mouseDownPosition = hit.point;
//			print(mouseDownPosition);
		}
		mouseButton1Started = true;	
	}
	else if (Input.GetMouseButtonDown(1) && mouseButton1Started == true) {
		// put sizable vortex code here, set vortex isActive to false, make true on button up. Vortex timer set by particle effect timer.
	
	}
	else if (Input.GetMouseButtonUp(1) && mouseButton1Started) {
		ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray, hit, 100.0)) {
			newMousePosition = hit.point;
//			print(newMousePosition);
			var vortexMidPoint : Vector3 = MidPoint(newMousePosition, mouseDownPosition);
			//raise slightly above plane for better particle effect. plane rests at -0.5 currently
			// we should consider automating a "place on floor" solution so we can change things with ease
			vortexMidPoint.y = 0.0;
			MakeVortex(vortexMidPoint);
		}
		mouseButton1Started = false;
	}
}

function MakeVortex (vortexMidPoint : Vector3) {
	
	Instantiate (vortexParticleSystem, vortexMidPoint, Quaternion.identity);
	//the future iteration will instead instatiate a vortex object that has the particle system and game script attached. Note also that this current
	//particle system is made using Unity 3.5's Shuriken system which is still limited and doesn't have support for script access. This is just a placeholder
	// We need to scale this object according to the distance between the points, and scale the attached particle system (which may not be possible with Shuriken)
}


static function MidPoint(start : Vector3, end : Vector3) : Vector3 {

    return Vector3(

        (start.x+end.x)/2, 

        (start.y+end.y)/2, 

        (start.z+end.z)/2 

    );

}
