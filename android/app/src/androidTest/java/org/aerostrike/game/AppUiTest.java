package org.aerostrike.game;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import android.content.Context;
import android.content.Intent;

import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import androidx.test.uiautomator.By;
import androidx.test.uiautomator.UiDevice;
import androidx.test.uiautomator.UiObject2;
import androidx.test.uiautomator.Until;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class AppUiTest {

    private static final String APP_PACKAGE = "org.aerostrike.game";
    private static final int LAUNCH_TIMEOUT = 10000;
    private UiDevice device;

    @Before
    public void startMainActivityFromHomeScreen() {
        device = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());
        device.pressHome();

        final String launcherPackage = device.getLauncherPackageName();
        assertNotNull(launcherPackage);
        device.wait(Until.hasObject(By.pkg(launcherPackage).depth(0)), LAUNCH_TIMEOUT);

        Context context = ApplicationProvider.getApplicationContext();
        final Intent intent = context.getPackageManager().getLaunchIntentForPackage(APP_PACKAGE);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(intent);

        device.wait(Until.hasObject(By.pkg(APP_PACKAGE).depth(0)), LAUNCH_TIMEOUT);
        // Wait for WebView content to load
        device.wait(Until.hasObject(By.text("MAIN LOBBY")), LAUNCH_TIMEOUT);
    }

    @Test
    public void testLobbyUIElements() {
        // Verify Title
        assertNotNull("Lobby title not found", device.wait(Until.findObject(By.text("MAIN LOBBY")), LAUNCH_TIMEOUT));
        
        // Verify Player Stats
        assertNotNull("Gold count not found", device.findObject(By.text("12,450")));
        assertNotNull("Gem count not found", device.findObject(By.text("1,290")));
        assertNotNull("Player level not found", device.findObject(By.text("LV 28")));

        // Verify Character
        assertNotNull("Character name 'STRIKER-7' not found", device.findObject(By.text("STRIKER-7")));
        assertNotNull("Class 'ASSAULT' not found", device.findObject(By.text("ASSAULT")));
    }

    @Test
    public void testSidebarNavigation() {
        // Navigate to LOADOUT
        clickAndVerify("LOADOUT");
        
        // Go back to Lobby
        clickAndVerify("LOBBY");

        // Navigate to BATTLE PASS
        clickAndVerify("BATTLE PASS");

        // Navigate to RANKED
        clickAndVerify("RANKED");

        // Navigate to 2D DEMO
        clickAndVerify("2D DEMO");
    }

    private void clickAndVerify(String text) {
        UiObject2 navItem = device.wait(Until.findObject(By.text(text)), LAUNCH_TIMEOUT);
        assertNotNull("Sidebar item '" + text + "' not found", navItem);
        navItem.click();
        
        // Verify screen header change
        boolean foundHeader = device.wait(Until.hasObject(By.text(text).clazz("android.widget.TextView")), LAUNCH_TIMEOUT);
        assertTrue("Header didn't change to " + text, foundHeader);
    }
}
