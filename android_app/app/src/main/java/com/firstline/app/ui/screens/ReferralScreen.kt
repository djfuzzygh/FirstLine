package com.firstline.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.text.font.FontFamily

@Composable
fun ReferralScreen(onFinish: () -> Unit) {
    val soapNote = """
        S: 3yo Female presents with cough and fever.
        O: RR 55 (Tachypnea).
        A: Suspected Pneumonia.
        P: Urgent Referral to District Hospital.
    """.trimIndent()

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp)
    ) {
        Text("Referral Summary", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth().weight(1f),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Text(
                text = soapNote,
                modifier = Modifier.padding(16.dp),
                fontFamily = FontFamily.Monospace
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = { /* Share Logic */ },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("SHARE AS TEXT / SMS")
        }
        
        Spacer(modifier = Modifier.height(8.dp))

        OutlinedButton(
            onClick = onFinish,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("FINISH CASE & SYNC")
        }
    }
}
