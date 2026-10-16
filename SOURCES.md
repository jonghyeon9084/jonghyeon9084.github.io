# 콘텐츠·미디어 출처

사용자가 제공한 프로젝트 자료에서 실제 사진과 시연 영상을 가져왔습니다. 가상의 성능 지표는 사용하지 않았습니다. 데이터 수집 예시의 얼굴은 개인정보 보호를 위해 모자이크 처리했습니다.

## 이력서와 구성

사용자가 공유한 [자료 폴더](https://drive.google.com/drive/folders/1222Wq4kwzySFXGR7DCNQpXZDkxaKokAZ)의 이력서에 맞춰 AMR → STM32 → POCO → PLC 순서로 구성했습니다. 원본 이력서는 공개 저장소에 복제하지 않았습니다.

## 사진과 영상

| 파일 | 원본 및 용도 |
| --- | --- |
| `jonghyeon-lee.jpg` | 사용자가 지정한 본인 프로필 사진 원본. 얼굴 보정 없이 사용. |
| `amr-factory.webp` | [ROS 2 1차 발표자료](https://www.canva.com/design/DAHXgSipP4s/DYR3L0axDWiAUCqLQnEEKg/view)의 실제 공정 전경. |
| `amr-navigation.mp4`, `amr-navigation.webp` | 같은 발표자료 10페이지의 주행 시연 및 미리보기. 발표자료의 재생 속도 유지. |
| `stm32-robot-car.webp` | [STM32 발표자료](https://canva.link/mymddp2p08ayiq6) 7페이지, 기존 사이트의 실제 시제품 사진. |
| `vision-demo.mp4`, `vision-demo.webp` | [AI 1차 결과 발표자료](https://drive.google.com/file/d/10GqHqObUGTM4M36rndEeOvd0S6XkdPWK/view) 8페이지의 통합 시연. |
| `face-data-private.png` | 같은 AI 1차 자료 19페이지의 직접 촬영 데이터 예시. 2026-10-16 사용자 요청에 따라 여섯 얼굴 모두 모자이크 처리. |
| `poco-front.webp`, `poco-arm.webp`, `poco-architecture.webp` | [POCO 개발완료보고서](https://drive.google.com/file/d/1e4-8anClCcBkpaqfTVRHoVjOUQRIE6rJ/view)의 시제품 정면·측면과 시스템 구성도. |
| POCO YouTube 플레이어 | 개발완료보고서 3페이지에 연결된 [팀 통합 시연](https://youtu.be/UHQtAFz2T6M). |
| `plc-demo.mp4` | [PLC 발표자료](https://drive.google.com/file/d/16evFtzF2HJ6Xl9evopYYR-tJwNN1Dgkg/view) 4페이지의 공정·HMI 시연. |
| `plc-process.webp`, `plc-hmi.webp`, `plc-timer.webp`, `plc-teaching.webp` | 같은 PLC 발표자료의 공정 전경, HMI, TTMR 측정, Teaching 화면. |
| `plc-system.webp` | 기존 사이트에 포함된 실제 PLC 장비 사진. |

WebP 파일은 원본 자료의 이미지를 웹 전송용으로 변환했습니다. 팀 결과물은 페이지의 캡션과 담당 범위에서 구분합니다.

얼굴 모자이크에는 내장 이미지 편집 도구를 사용했습니다. 편집 지시: 여섯 얼굴 전체에 강한 사각 모자이크를 적용하고, 원본의 파일명·카드 배열·촬영 화면과 나머지 정보를 유지. 본문 및 확대 보기 모두 모자이크 파일을 사용하며, 기존 비처리 파일은 현재 배포 파일에서 제외했습니다. 이전 Git 커밋 기록은 변경하지 않았습니다.

## 기술 설명의 근거

- AMR: [AMR 저장소](https://github.com/7s-FA/AMR), [버거1·2 진행 및 1차 목표 완료 기록](https://rorobot.atlassian.net/wiki/spaces/robot3/pages/30900268), 2026-10-12 1차 발표자료. 로봇 내부 Nav2·AMCL / Host 공정 관리 구조를 반영했습니다. 통합 시연과 최신 최적화본의 후속 검증을 구분했습니다.
- STM32: [프로젝트 저장소](https://github.com/sditr0414/mobile-retrieval-robot), 이력서, 기존 사이트의 IMU 측정·제어 기록. 센서 Bias 측정값을 주행 궤적 정확도로 표현하지 않았습니다.
- POCO: AI 1차 발표자료와 개발완료보고서. 22/22, 6.85 mm, 93.90%, 47.78 ms는 보고서의 팀 통합 평가 수치이며 단일 평가 세션 및 POSE-ONLY 조건을 명시했습니다. 졸음 모델은 개선 중이고 최종 통합 시연에서는 Face가 비활성화된 상태였습니다.
- PLC: 발표자료와 [저장소](https://github.com/jonghyeon9084/plc_project). 이종현·조병현 공동 작업. 총 시간 173.3초 → 152.8초의 감소율은 약 11.8%입니다.
