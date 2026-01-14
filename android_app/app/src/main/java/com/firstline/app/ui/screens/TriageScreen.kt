package com.firstline.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun TriageScreen(onNavigateToReferral: () -> Unit) {
    // Mocking a RED triage result with danger signs
    val riskTier = "RED"
    val dangerSigns = listOf("Tachypnea (High Respiratory Rate)", "Dehydration signs")
    val uncertainty = "LOW"
    
    val color = when(riskTier) {
        "RED" -> Color(0xFFD32F2F)
        "YELLOW" -> Color(0xFFFBC02D)
        else -> Color(0xFF388E3C)
    }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp)
    ) {
        Text("Triage Recommendation", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))

        Box(
            modifier = Modifier.fillMaxWidth().height(100.dp).background(color, MaterialTheme.shapes.medium),
            contentAlignment = Alignment.Center
        ) {
            Text(riskTier, color = Color.White, fontSize = 32.sp, fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(24.dp))

        if (dangerSigns.isNotEmpty()) {
            Text("DANGER SIGNS DETECTED:", color = Color(0xFFD32F2F), fontWeight = FontWeight.Bold)
            dangerSigns.forEach { sign ->
                Text("• $sign")
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
        
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
        ) {
             Column(modifier = Modifier.padding(16.dp)) {
                 Text("AI Reasoning", fontWeight = FontWeight.Bold)
                 Text("The combination of fast breathing and fever in a child suggests possible pneumonia. Urgent referral is required per IMCI guidelines.")
                 Spacer(modifier = Modifier.height(8.dp))
                 Text("Uncertainty: $uncertainty", style = MaterialTheme.typography.labelSmall)
             }
        }

        Spacer(modifier = Modifier.weight(1f))
        
        Text(
            "DISCLAIMER: Clinical decision support only. Confirm clinically.",
            style = MaterialTheme.typography.labelSmall,
            color = Color.Gray
        )
        
        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = onNavigateToReferral,
            modifier = Modifier.fillMaxWidth().height(56.dp)
        ) {
            Text("GENERATE REFERRAL SUMMARY")
        }
    }
}
