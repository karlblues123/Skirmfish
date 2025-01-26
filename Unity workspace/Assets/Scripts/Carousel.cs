using UnityEngine;

public class Carousel : MonoBehaviour
{
    public GameObject[] pages;
    private int index;

    public void Awake()
    {
        index = 0;
        pages[index].SetActive(true);
    }

    public void NextClick()
    {
        if (index < pages.Length - 1) 
        {
            pages[index].SetActive(false);
            index++;
            pages[index].SetActive(true);
        }
    }

    public void PreviousClick()
    {
        if(index > 0)
        {
            pages[index].SetActive(false);
            index--;
            pages[index].SetActive(true);
        }
    }
}
