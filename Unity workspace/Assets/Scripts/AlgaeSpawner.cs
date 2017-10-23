using UnityEngine;
using System.Collections;

public class AlgaeSpawner : MonoBehaviour {

    public GameObject algaePrefab;
    private float spawnDelay;
    
    // Use this for initialization
	void Start () {
	    this.spawnDelay = 5f;
    }
	
	// Update is called once per frame
	void Update () {
        this.spawnDelay -= Time.deltaTime;
        if(this.spawnDelay <= 0)
        {
            GameObject instance = Instantiate<GameObject>(algaePrefab);
            instance.transform.SetParent(this.transform);
            instance.transform.localPosition = new Vector2(Random.Range(-5, 5), 0);
            this.spawnDelay = 5f;
        }
	}
}
