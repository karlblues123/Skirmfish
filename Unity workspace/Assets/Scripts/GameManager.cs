using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

    private static float[,] damageMultiplierMatrix = { { 1, 0.5f, 2 } , { 2, 1, 0.5f } , { 0.5f, 2, 1 } };
    public UnityEngine.UI.Text announcerText;
    public GameObject rematchButton, exitButton;
    private WaitForSeconds startDelay, endDelay;
    private int countdown = 6;
    public Player player1, player2;

    void Start()
    {
        this.startDelay = new WaitForSeconds(1f);
        this.endDelay = new WaitForSeconds(1f);
        StartCoroutine(GameLoop());
    }

    public static float GetMultiplier(int attackerIndex, int defenderIndex)
    {
        return damageMultiplierMatrix[attackerIndex,defenderIndex];
    }

    //Round Start Code
    private IEnumerator RoundStart()
    {
        this.player1.enabled = false;
        this.player2.enabled = false;
        this.rematchButton.SetActive(false);
        this.exitButton.SetActive(false);
        for(int i = 1; i <= 3; i++)
        {
            GameObject.Find("Lane " + i).GetComponent<AlgaeSpawner>().enabled = false;
        }
        while(countdown > 0)
        {
            yield return StartCoroutine(Countdown());
        }
        yield return startDelay;
    }

    private IEnumerator Countdown()
    {
        this.countdown--;
        if (this.countdown > 0)
            this.announcerText.text = this.countdown.ToString();
        else
            this.announcerText.text = "GO";
        yield return new WaitForSeconds(1f);
    }

    private IEnumerator RoundPlaying()
    {
        this.announcerText.text = "";
        this.player1.enabled = true;
        this.player2.enabled = true;
        for (int i = 1; i <= 3; i++)
        {
            GameObject.Find("Lane " + i).GetComponent<AlgaeSpawner>().enabled = true;
        }
        
        while (!(this.player1.currentHealth <= 0) && !(this.player2.currentHealth <= 0))
        {
            yield return null;
        }
    }

    private IEnumerator RoundEnd()
    {
        this.player1.enabled = false;
        this.player2.enabled = false;
        this.rematchButton.SetActive(true);
        this.exitButton.SetActive(true);
        for (int i = 1; i <= 3; i++)
        {
            GameObject.Find("Lane " + i).GetComponent<AlgaeSpawner>().enabled = false;
        }
        if (this.player1.currentHealth <= 0)
            this.announcerText.text = "Player 2 is the Winner";
        else if (this.player2.currentHealth <= 0)
            this.announcerText.text = "Player 1 is the Winner";
        yield return endDelay;
    }

    //Game Loop
    private IEnumerator GameLoop()
    {
        yield return StartCoroutine(RoundStart());

        yield return StartCoroutine(RoundPlaying());

        yield return StartCoroutine(RoundEnd());
    }
	
}
