using UnityEngine;
using System.Collections;

public class HealthBar : MonoBehaviour {

    public UnityEngine.UI.Slider healthBar;
    public Player player;
    
    // Use this for initialization
	void Start () {
        this.healthBar.maxValue = player.maxHealth;
        this.healthBar.value = player.currentHealth;
    }
	
	// Update is called once per frame
	void Update () {
        this.healthBar.value = player.currentHealth;
	}
}
