package com.firstline.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun FollowUpScreen(onNavigateToTriage: () -> Unit) {
    val questions = listOf(
        "Is the patient able to drink or breastfeed?",
        "Has the patient had any convulsions during this illness?",
        "Is the patient unusually sleepy or difficult to wake up?"
    )

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp)
    ) {
        Text("Follow-up Questions", style = MaterialTheme.typography.headlineMedium)
        Text("Based on initial symptoms, please clarify the following:", style = MaterialTheme.typography.bodyMedium)
        
        Spacer(modifier = Modifier.height(24.dp))

        questions.forEach { question ->
            Text(question, style = MaterialTheme.typography.bodyLarge)
            Row(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
                Button(onClick = {}, modifier = Modifier.weight(1f)) { Text("Yes") }
                Spacer(modifier = Modifier.width(8.dp))
                OutlinedButton(onClick = {}, modifier = Modifier.weight(1f)) { Text("No") }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = onNavigateToTriage,
            modifier = Modifier.fillMaxWidth().height(56.dp)
        ) {
            Text("CALCULATE TRIAGE")
        }
    }
}
