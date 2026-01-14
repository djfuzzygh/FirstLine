package com.firstline.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.firstline.app.ui.screens.*
import com.firstline.app.ui.theme.FirstLineTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FirstLineTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation()
                }
            }
        }
    }
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "welcome") {
        composable("welcome") { WelcomeScreen(onStart = { navController.navigate("intake") }) }
        composable("intake") { IntakeScreen(onNavigateToFollowUp = { navController.navigate("followup") }) }
        composable("followup") { FollowUpScreen(onNavigateToTriage = { navController.navigate("triage") }) }
        composable("triage") { TriageScreen(onNavigateToReferral = { navController.navigate("referral") }) }
        composable("referral") { ReferralScreen(onFinish = { navController.popBackStack("welcome", false) }) }
    }
}
