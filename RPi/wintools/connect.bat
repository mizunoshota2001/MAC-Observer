@echo off
ssh-keygen -R mac-obs.local
ssh -o StrictHostKeyChecking=no pi5@mac-obs.local