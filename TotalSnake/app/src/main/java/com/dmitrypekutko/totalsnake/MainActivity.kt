package com.dmitrypekutko.totalsnake

import android.os.Bundle
import android.view.KeyEvent
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    var web: WebView? = null;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //setContentView(R.layout.activity_main)

        supportActionBar?.hide()

        web = WebView(this)
        web?.settings?.javaScriptEnabled = true;
        web?.settings?.domStorageEnabled = true;
        web?.loadUrl("file:///android_asset/web/build/index.html")
        //web.loadUrl("www.youtube.com")
        web?.webViewClient = MyWebViewClient()

        setContentView(web)

    }

    private inner class MyWebViewClient : WebViewClient() {
        override fun onPageFinished(view: WebView, url: String) {
            //Calling a javascript function in html page
            view.loadUrl("javascript:alert(showVersion('called by Android'))")
        }
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean {
        if (event.action === KeyEvent.ACTION_DOWN) {
            when (keyCode) {
                KeyEvent.KEYCODE_BACK -> {
                    if (web?.canGoBack() == true) {
                        web?.goBack()
                    } else {
                        finish()
                    }
                    return true
                }
            }
        }
        return super.onKeyDown(keyCode, event)
    }

}