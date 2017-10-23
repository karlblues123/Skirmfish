using UnityEngine;
using System.Collections;

public class Algae : MonoBehaviour {

    public int value;
    
    // Use this for initialization
	void Start () {
        this.value = Random.Range(1, 10) * 10;
	}
}
