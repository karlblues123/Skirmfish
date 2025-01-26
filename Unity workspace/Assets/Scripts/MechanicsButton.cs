using UnityEngine;

public class MechanicsButton : MonoBehaviour
{
    public GameObject popup;

    public void OnClick()
    {
        popup.SetActive(!popup.activeSelf);
    }
}
