using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenuButton : MonoBehaviour {

    public int sceneIndex;

    public void OnClick()
    {
        SceneManager.LoadScene(sceneIndex);
    }
}
