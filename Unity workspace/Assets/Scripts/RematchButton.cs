using UnityEngine;
using UnityEngine.SceneManagement;

public class RematchButton : MonoBehaviour {

	public void OnClick()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
