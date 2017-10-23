using UnityEngine;
using System.Collections;

public class Unit : MonoBehaviour {

    public int currentHealth, maxHealth, playerIndex, damage;
    private float speed = 1f;
    public Rigidbody2D rigidBody;
    public int unitType;
    public Unit lockedOnEnemy;
    public Player enemyPlayer;
    public Animator animator;

    public void Start()
    {
        this.maxHealth = 200;
        this.currentHealth = this.maxHealth;
        this.damage = 20;
        rigidBody.velocity = new Vector2(speed, 0);
        if(this.playerIndex == 2)
        {
            this.gameObject.GetComponent<SpriteRenderer>().flipX = true;
            rigidBody.velocity *= -1;
        }
    }

    void Update()
    {
        if(this.currentHealth <= 0)
        {
            animator.SetBool("isDefeated", true);
        }
        if(lockedOnEnemy == null && enemyPlayer == null)
        {
            this.rigidBody.velocity = Vector2.right;
            if (this.playerIndex == 2)
                rigidBody.velocity *= -1;
            animator.SetBool("isAttacking", false);
        }
    }

    void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.gameObject.tag == "Unit")
        {
            if (collider.GetComponent<Unit>().playerIndex != this.playerIndex)
            {
                this.lockedOnEnemy = collider.GetComponent<Unit>();
                this.rigidBody.velocity = Vector2.zero;
                this.animator.SetBool("isAttacking", true);
            }
        }
        else if(collider.gameObject.tag == "Player")
        {
            if (collider.GetComponent<Player>().playerIndex != this.playerIndex)
            {
                this.enemyPlayer = collider.gameObject.GetComponent<Player>();
                this.rigidBody.velocity = Vector2.zero;
                this.animator.SetBool("isAttacking", true);
            }
        }
        else if (collider.gameObject.tag == "Algae")
        {
            GameObject algae = collider.gameObject;
            GameObject.Find("Player " + this.playerIndex).GetComponent<Player>().algae += algae.GetComponent<Algae>().value;
            Destroy(algae);
        }
    }

    void DamageEnemy()
    {
        if (this.lockedOnEnemy != null)
            this.lockedOnEnemy.currentHealth -= Mathf.FloorToInt(this.damage * GameManager.GetMultiplier(this.unitType,this.lockedOnEnemy.unitType));
        else if (this.enemyPlayer != null)
            this.enemyPlayer.currentHealth -= this.damage;
    }

    void OnDefeat()
    {
        Destroy(this.gameObject);
    }
}
