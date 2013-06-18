#pragma strict


var grimmoireTarget: Transform;
// all speeds shoulf be float
public var monsterSpeed = 2.0;
var canMove : boolean = true;

function Start () {
	grimmoireTarget = GameObject.Find("Grimmoire").transform;
}

function Update () {
	if (canMove) {
		var point : Vector3 = grimmoireTarget.position;
		point.y = 0.0; //match with spawn height. when we use rigidbodies, ignore this. we'll let the physics engine handle it
		transform.LookAt(point);
		var movementVector : Vector3 = Vector3.forward;
		movementVector.y = 0.0;
		//Need to fix: currently vector points to center of Grimmoire object, which causes movement in y axis which we don't want
	//	transform.Translate(Vector3.forward * Time.deltaTime * monsterSpeed);
		transform.Translate(movementVector * Time.deltaTime * monsterSpeed);
	}
}
