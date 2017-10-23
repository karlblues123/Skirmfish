using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour
{
    public int currentHealth, maxHealth, algae, playerIndex;
    private float algaeRegenDelay;
    public GameObject[] lanes, units;
    private int laneInput, unitInput;
    private static int unitCost = 20;

    // Use this for initialization
    void Awake()
    {
        this.maxHealth = 1500;
        this.currentHealth = this.maxHealth;
        this.algae = 100;
        this.algaeRegenDelay = 1f;
        this.laneInput = -1;
        this.unitInput = -1;
    }

    // Update is called once per frame
    void Update()
    {
        InputHandler();
        if(this.laneInput > -1 && this.unitInput > -1)
        {
            InstantiateUnit(this.unitInput, this.laneInput);
            this.laneInput = -1;
            this.unitInput = -1;
        }
        if(this.currentHealth <= 0)
        {
            Destroy(this.gameObject);
        }
    }

    void FixedUpdate()
    {
        this.algaeRegenDelay -= Time.deltaTime;
        if (this.algaeRegenDelay <= 0)
        {
            this.algae ++;
            this.algaeRegenDelay = 1f;
        }
    }

    void InstantiateUnit(int unitIndex, int laneIndex)
    {
        GameObject instance = Instantiate<GameObject>(units[unitIndex]);
        instance.transform.SetParent(lanes[laneIndex].transform);
        instance.transform.localPosition = new Vector2(this.transform.position.x, 0);
        instance.GetComponent<Unit>().playerIndex = this.playerIndex;
        this.algae -= unitCost;
    }

    void InputHandler()
    {
        if (this.algae >= unitCost)
        {
            if (this.playerIndex == 1)
            {
                if (Input.GetKeyDown(KeyCode.Q))
                {
                    this.unitInput = 0;
                }
                else if (Input.GetKeyDown(KeyCode.W))
                {
                    this.unitInput = 1;
                }
                else if (Input.GetKeyDown(KeyCode.E))
                {
                    this.unitInput = 2;
                }
                else if (Input.GetKeyDown(KeyCode.Alpha1))
                {
                    this.laneInput = 0;
                }
                else if (Input.GetKeyDown(KeyCode.Alpha2))
                {
                    this.laneInput = 1;
                }
                else if (Input.GetKeyDown(KeyCode.Alpha3))
                {
                    this.laneInput = 2;
                }
            }
            else if(this.playerIndex == 2)
            {
                if (Input.GetKeyDown(KeyCode.I))
                {
                    this.unitInput = 0;
                }
                else if (Input.GetKeyDown(KeyCode.O))
                {
                    this.unitInput = 1;
                }
                else if (Input.GetKeyDown(KeyCode.P))
                {
                    this.unitInput = 2;
                }
                else if (Input.GetKeyDown(KeyCode.Alpha8))
                {
                    this.laneInput = 0;
                }
                else if (Input.GetKeyDown(KeyCode.Alpha9))
                {
                    this.laneInput = 1;
                }
                else if (Input.GetKeyDown(KeyCode.Alpha0))
                {
                    this.laneInput = 2;
                }
            }
        }

    }
}
