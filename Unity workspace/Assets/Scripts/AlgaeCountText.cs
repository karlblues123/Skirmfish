using UnityEngine;
using System.Collections;

public class AlgaeCountText : MonoBehaviour {

    public UnityEngine.UI.Text uiText;
    public Player player;
    
    // Use this for initialization
	void Start () {
        this.uiText.text = this.player.algae.ToString();
	}
	
	// Update is called once per frame
	void Update () {
        this.uiText.text = this.player.algae.ToString();
    }
}
